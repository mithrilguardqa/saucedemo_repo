import { rmSync } from "node:fs";
import type { Reporter } from "@playwright/test/reporter";

export default class CleanAllureResults implements Reporter {
  constructor(private readonly options: { resultsDir: string }) {}

  onBegin(): void {
    rmSync(this.options.resultsDir, { recursive: true, force: true });
  }

  printsToStdio(): boolean {
    return false;
  }
}
