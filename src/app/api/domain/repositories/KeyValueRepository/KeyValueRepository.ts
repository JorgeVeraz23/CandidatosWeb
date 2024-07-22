import { KeyValueEntity } from "../../entities/KeyValueEntities/KeyValueEntity";


export default interface KeyValueRepository {
    KeyValueCandidato(): Promise<KeyValueEntity[]>;
}
