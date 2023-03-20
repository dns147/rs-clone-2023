import { currentMusic } from "../utils/Music";

export function togglePlayMusic(): void | Promise<void> {
  return currentMusic.paused ? currentMusic.play() : currentMusic.pause();
}