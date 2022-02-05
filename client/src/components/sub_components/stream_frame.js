import {Container} from '@mui/material'

const StreamFrame = (props) => {
    return (
        <Container>
            <video
                class="video-js"
                controls
                preload="auto"
                data-setup='{liveui: true}'>
                <source src={props.stream_playback_url} type="application/x-mpegURL"></source>
            </video>
        </Container>
    )
}

export default StreamFrame;