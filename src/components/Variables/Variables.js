class Variables extends Variables{


    constructor(props){
        super(props);
        this.state = {
            isPlaying: false,
            volume: 20,
            currentTime: 0.0,
            totalTime: 1.0,
            podcastFile: '',
            podcastTitle: '',
            podcastImage: '',
            podcastArtist: '',
        };
    }

}

export default Variables;

