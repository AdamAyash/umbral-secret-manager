import { Injectable } from "@angular/core";
import { BaseServerRequestService, BaseServerResponse } from "../../api";
import { map, Observable, shareReplay } from "rxjs";
import { GetRequiresInitialSetupOutputModel } from "./models/get-require-initial-setup-output.model";

@Injectable({ providedIn: 'root' })
export class SetupStatusService extends BaseServerRequestService {

    private _initialSetupStatusRequest$?: Observable<GetRequiresInitialSetupOutputModel>;

    /**
     * Gets the application's setup status. The observable is intentionally returned
     * so a route guard can wait for the server result before activating a route.
     */
    public getRequiresInitialSetup(): Observable<GetRequiresInitialSetupOutputModel> {
        if (!this._initialSetupStatusRequest$) {
            this._initialSetupStatusRequest$ = this._httpClient
                .get<BaseServerResponse<GetRequiresInitialSetupOutputModel>>(this.constructFullRequestURL('require-initial-setup'))
                .pipe(
                    map((response) => {
                        if (!response.isSuccessful || !response.data)
                            throw new Error('The setup status request did not return a valid response.');

                        return response.data;
                    }),
                    shareReplay({ bufferSize: 1, refCount: false })
                );
        }

        return this._initialSetupStatusRequest$;
    }

    protected override getServiceDomain(): string {
        return 'setup'
    }
}
