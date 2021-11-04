import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import spotifyApi from '../../../lib/SpotifyWebApi'

export default async (req, res) => {
    try {
        const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET })
        spotifyApi.setAccessToken(token.spotify.accessToken)
        spotifyApi.getMyRecentlyPlayedTracks({
            limit : 50 // 50 is max
          }).then(function(data) {
              // Output items
              data.body.items.forEach(item => console.log(item.track));
              return res.status(200).json({ data })
            }, function(err) {
              console.log('Something went wrong!', err);
              return res.status(500).json({ error: "Error!" })
            });
    } catch (e) {
        return res.status(400).json({
            status: e.message
        });
    }
}