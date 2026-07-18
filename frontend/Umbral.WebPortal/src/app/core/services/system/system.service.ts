import { Injectable } from '@angular/core';
import { BaseServerRequestService, IServerResponseProcessable } from '../../api';
import { EmptyOutputModel } from '../../api/models/empty-output.model';
import { SystemServiceErrorCodes } from './system-server-error-codes';

@Injectable({
  providedIn: 'root',
})
export class SystemService extends BaseServerRequestService {

  public isSystemLive(serverResponseProcessable: IServerResponseProcessable<EmptyOutputModel, SystemServiceErrorCodes>): void {
    this.sendServerGetRequest('get-system-status', serverResponseProcessable)
  }

  protected override getServiceDomain(): string {
    return "system"
  }
}
