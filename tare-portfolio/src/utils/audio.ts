// Audio synthesis disabled
class SoundFX {
  public enabled: boolean = false;
  public ambientPlaying: boolean = false;

  public setEnabled(_val: boolean) {}
  public toggleAmbient(): boolean {
    return false;
  }
  public playClick() {}
  public playHover() {}
  public playPowerOn() {}
  public playKeypress() {}
  public playSuccess() {}
}

export const soundFx = new SoundFX();
