import { Environments } from "../../../shared/enumerations/environments";

export class SecretModel {
    public id?: string;
    public name?: string;
    public value?: string;
    public environment?: Environments;
}
