import NextAuth, { Profile } from "next-auth"
import { OIDCConfig } from "next-auth/providers"
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        DuendeIDS6Provider({
            id: 'id-server',
            clientId: "nextApp",
            clientSecret: "secret",
            issuer: "http://172.18.38.169:5000",
            authorization: {params: {scope: 'openid profile auctionApp'}},
            idToken: true
        } as OIDCConfig<Omit<Profile, 'username'>>)
    ],
    callbacks: {
        async authorized({auth}){
            return !!auth;
        },
        async jwt({token, profile}) {
            // console.log({token, user, account, profile})
            if(profile){
                token.username = profile.username
            }
            return token;
        },
        async session({session, token}){
            // console.log({session, token})
            if(token){
                session.user.username = token.username
            }
            return session;
        }
    }
})