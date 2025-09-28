import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

// Este es un usuario hardcodeado para demostración
// En producción, esto debería estar en una base de datos
const users = [
  {
    id: "1",
    name: "Eduardo Raul Scotto",
    email: "admin@scottoinmobiliaria.com",
    password: "admin123", // En producción, usar hash
  },
];

// Definimos las opciones de autenticación pero no las exportamos directamente
const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "b8764d44c9570edfc852ba899d1fdcdb",
  debug: process.env.NODE_ENV === 'development',
  // trustHost: true, // Removed – not a valid property in AuthOptions
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Credenciales incompletas");
          return null;
        }

        const user = users.find((user) => user.email === credentials.email);
        console.log("Usuario encontrado:", user ? "Sí" : "No");

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        console.log("Contraseña incorrecta");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  // secret already defined above
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };