import {
    InspectionFormEntity,
    QuestionAnswerInspectionFormEntity,
    EditQuestionInspectionInspectionEntity,
    ImageInspectionEntity,
    GetAllInspectionFormByIdEntity
} from "../entities/InspectionFormEntity";

export default interface InspectionFormRepository {
    getAllInspectionForm(filter?: InspectionFormProps): Promise<InspectionFormEntity>;
    getQuestionAnswerInspection(id: number): Promise<QuestionAnswerInspectionFormEntity>;
    editQuestionAnswerInspection(data: EditQuestionInspectionInspectionEntity): Promise<boolean>;
    deleteInspectionForm(id: number): Promise<boolean>;
    getImagesInspection(id: number): Promise<ImageInspectionEntity[]>;
    deleteImageInspection(data: ImageInspectionEntity): Promise<boolean>;
    uploadImageInspection(data: FormData): Promise<boolean>;
    getAllInspectionFormById(id: number): Promise<GetAllInspectionFormByIdEntity>;
}
export interface InspectionFormProps {
    FromDate?: string;
    ToDate?: string;
    IdInspectionForm? : number;
}
