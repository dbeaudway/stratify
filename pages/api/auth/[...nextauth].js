import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: "https://accounts.spotify.com/authorize?scope=playlist-modify-private,playlist-modify-public,user-read-currently-playing,user-read-recently-played,user-top-read,user-read-email"
    })
  ],
  callbacks: {
    async jwt({ token, account }) {     
      // For some reason this callback is called twice on login and the second time
      // account is undefined. The first if(account) prevents that from wiping out
      // the original token values
      if (account) {
        if (account.provider && !token[account.provider]) {
          token[account.provider] = {};
        }
        
        if (account.access_token) {
          token[account.provider].accessToken = account.access_token;
        }
        
        if (account.refresh_token) {
          token[account.provider].refreshToken = account.refresh_token;
        }
      }

      return token;
    }
  },
  secret: process.env.NEXT_AUTH_SECRET
})