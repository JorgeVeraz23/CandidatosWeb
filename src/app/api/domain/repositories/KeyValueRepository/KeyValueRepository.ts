import { KeyValueEntity } from "../../entities/KeyValueEntities/KeyValueEntity";


export default interface KeyValueRepository {
    KeyValueCandidato(): Promise<KeyValueEntity[]>;
    KeyValueTransparencia(): Promise<KeyValueEntity[]>;
    KeyValueCargo(): Promise<KeyValueEntity[]>;
    KeyValuePartido(): Promise<KeyValueEntity[]>;
}
