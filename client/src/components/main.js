import { Card, CardContent, Container } from '@mui/material'
import StreamFrame from './sub_components/stream_frame.js'

//https://cdn.livepeer.com/hls/b61ck7n6s34545m1/index.m3u8
// //vjs.zencdn.net/v/oceans.mp4
const Main = ( ) => {
    return (
        <Container sx={{width: '65%'}}>
            <Card raised sx={{display: 'flex', justifyContent: 'center'}}>
                <CardContent>
                    <StreamFrame 
                        stream_playback_url="https://cdn.livepeer.com/hls/b61ck7n6s34545m1/index.m3u8"
                    />
                </CardContent>
            </Card>
        </Container>
    )
}

export default Main