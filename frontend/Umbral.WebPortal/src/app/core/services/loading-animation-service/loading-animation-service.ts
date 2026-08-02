import { Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoadingAnimationService {

    private _runningRequestsCounter: WritableSignal<number> = signal(0);

    public isLoadingAnimationActive(): boolean {
        return this._runningRequestsCounter() > 0;
    }

    public begin(): void {
        this._runningRequestsCounter.update(c => c + 1);
    }

    public end(): void {
        this._runningRequestsCounter.update(c => c - 1);
    }
}