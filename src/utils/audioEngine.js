/**
 * Audio playback for the friendship anthem.
 *
 * Optional local audio file:
 *   public/audio/bgm.mp3
 *
 * If the file is not present or cannot play, playback falls back to the
 * embedded YouTube player registered by SongTribute.
 */

class SongAudioEngine {
  constructor() {
    this.isPlaying = false;
    this.iframeElement = null;
    this.listeners = new Set();
    this.localAudio = null;

    if (typeof window !== 'undefined') {
      // BASE_URL is /daydream-duo/ on GitHub Pages and / during local dev.
      this.localAudio = new Audio(`${import.meta.env.BASE_URL}audio/bgm.mp3`);
      this.localAudio.loop = true;
      this.localAudio.preload = 'none';
      this.localAudio.addEventListener('ended', () => this.notify(false));
      this.localAudio.addEventListener('pause', () => {
        if (this.isPlaying && this.localAudio.currentTime > 0) this.notify(false);
      });
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
    this.listeners.forEach((callback) => callback(state));
  }

  playYouTube() {
    if (!this.iframeElement?.contentWindow) {
      this.notify(false);
      return;
    }

    this.iframeElement.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
      '*'
    );
    this.notify(true);
  }

  play() {
    // Prefer a user-supplied local track. Fall back to YouTube if it is absent.
    if (this.localAudio) {
      this.localAudio.play()
        .then(() => this.notify(true))
        .catch(() => this.playYouTube());
      return;
    }
    this.playYouTube();
  }

  pause() {
    if (this.localAudio && !this.localAudio.paused) {
      this.localAudio.pause();
    }

    if (this.iframeElement?.contentWindow) {
      this.iframeElement.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
        '*'
      );
    }
    this.notify(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    }
    this.play();
    return true;
  }
}

export const songAudio = new SongAudioEngine();
