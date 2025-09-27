import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || "tu_clave_secreta_temporal",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find((user) => user.email === credentials.email);

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

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
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "tu-secreto-temporal-para-desarrollo",
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };