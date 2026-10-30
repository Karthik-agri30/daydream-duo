/**
 * AUDIO ENGINE FOR "LIFE OF PAZHAM" (THIRUCHITRAMBALAM)
 * 
 * Plays the ACTUAL studio track of "Life of Pazham" (Anirudh Ravichander).
 * 
 * 1. Embeds and commands the official YouTube Studio Audio (ID: g4KADSMQDL8).
 * 2. Also checks for an offline local audio file (`/audio/life_of_pazham.mp3` or `/audio/bgm.mp3`).
 * 3. Notifies all UI listeners (Navbar, SongTribute card) so vinyl discs and wavebars animate in sync.
 */

class SongAudioEngine {
  constructor() {
    this.isPlaying = false;
    this.iframeElement = null;
    this.localAudio = null;
    this.listeners = new Set();
    this.isLocalAvailable = false;

    // Check if local file exists
    if (typeof window !== 'undefined') {
      const probeAudio = new Audio('/audio/life_of_pazham.mp3');
      probeAudio.oncanplay = () => {
        this.isLocalAvailable = true;
        this.localAudio = probeAudio;
        this.localAudio.loop = true;
      };
      probeAudio.onerror = () => {
        this.isLocalAvailable = false;
      };
    }
  }

  registerIframe(iframe) {
    this.iframeElement = iframe;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(state) {
    this.isPlaying = state;
    this.listeners.forEach((cb) => cb(state));
  }

  play() {
    // 1. If local MP3 exists, play it
    if (this.isLocalAvailable && this.localAudio) {
      this.localAudio.play().then(() => {
        this.notify(true);
      }).catch(() => {
        this.playYouTube();
      });
      return;
    }

    // 2. Otherwise, play official YouTube track
    this.playYouTube();
  }

  playYouTube() {
    if (this.iframeElement && this.iframeElement.contentWindow) {
      this.iframeElement.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
        '*'
      );
      this.notify(true);
    }
  }

  pause() {
    if (this.localAudio && !this.localAudio.paused) {
      this.localAudio.pause();
    }
    if (this.iframeElement && this.iframeElement.contentWindow) {
      this.iframeElement.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
        '*'
      );
    }
    this.notify(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const songAudio = new SongAudioEngine();
