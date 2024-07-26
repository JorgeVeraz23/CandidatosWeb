import { configureStore } from '@reduxjs/toolkit';
// CATALOGUE
import CatalogueInspectionOrderReducer  from './slices/catalog/CatalogueInspectionOrderSlice';
import CatalogueClientReducer  from './slices/catalog/CatalogueClientSlice';
import CatalogueRolReducer from './slices/catalog/CatalogueRolSlice';
import CatalogueInspectorReducer from './slices/catalog/CatalogueInspectorSlice';
import GetAllFormCatalosReducer from './slices/catalog/GetAllFormCatalogsSlice';
import GetCatalogQuestionInspectionReducer from './slices/catalog/GetCatalogQuestionInspectionSlice';
import getInspectorsEditReducer  from './slices/catalog/CatalogueInspectorEditSlice';
import CatalogueInspectorActiveReducer from './slices/catalog/CatalogueInspectorActiveSlice';
// INSPECTION ORDER
import CreateInspectionReducer  from './slices/order/CreateInspectionSlice';
import EditInspectionReducer  from './slices/order/EditInspectionOrderSlice';
import GetAllInspectionReducer  from './slices/order/GetAllInspectionOrdersSlice';
import GetInspectionOrderReducer  from './slices/order/GetInspectionOrderSlice';
import DeleteInspectionReducer  from './slices/order/DeleteInspectionOrdersSlice';
// INSPECTION FORM
import InspectionFormReducer from './slices/InspectionForm/GetAllInspectionFormSlice';
import GetQuestionAnswerInspectionReducer from './slices/InspectionForm/GetQuestionAnswerInspectionSlice';
import EditQuestionAnswerInspectionReducer from './slices/InspectionForm/EditQuestionAnswerInspectionSlice';
import DeleteInspectionFormReducer from './slices/InspectionForm/DeleteInspectionFormSlice';
import GetAllInspectionFormByIdReducer from './slices/InspectionForm/GetAllInspectionFormByIdSlice';
// IMAGES FORM
import GetImagesInspectionReducer from './slices/InspectionForm/GetImagesInspectionSlice';
import DeleteImageInspectionReducer from './slices/InspectionForm/DeleteImageInspectionSlice';
import UploadImageInspectionReducer from './slices/InspectionForm/UploadImageInspectionSlice';
// PLANNING
import CreatePlanningReducer  from './slices/planning/CreatePlanningSlice';
import EditPlanningReducer  from './slices/planning/EditPlanningSlice';
import GetAllPlanningsReducer  from './slices/planning/GetAllPlanningsSlice';
import GetPlanningReducer  from './slices/planning/GetPlanningSlice';
import DeletePlanningReducer  from './slices/planning/DeletePlanningSlice';
import GetPlanningByFilterReducer from './slices/planning/GetPlanningByFilterSlice';
//CLIENT
import CreateClientReducer from './slices/clients/CreateClientSlice';
import EditClientReducer from './slices/clients/EditClientSlice';
import GetAllClientReducer from './slices/clients/GetAllClientSlice';
import GetClientReducer from './slices/clients/GetClientSlice';
import DeleteClientReducer from './slices/clients/DeleteClientSlice';
//GET TYPE DOCUMENTS
import getTypeDocumentsCatalogueReducer from './slices/catalog/getTypeDocumentsCatalogueSlice/getTypeDocumentsCatalogueSlice';
//FORMS
import CreateFormReducer from "./slices/form/CreateFormSlice";
import EditFormReducer from "./slices/form/EditFormSlice";
import GetAllFormReducer from "./slices/form/GetAllFormSlice";
import GetFormReducer from "./slices/form/GetFormSlice";
import DeleteFormReducer from "./slices/form/DeleteFormSlice";
import CatalogueFormReducer from './slices/form/CatalogueFormSlice';
//TYPE QUESTIONS
import CreateTypeQuestionReducer from './slices/typeQuestion/CreateTypeQuestionSlice';
import DeleteTypeQuestionReducer from './slices/typeQuestion/DeleteTypeQuestionSlice';
import EditQuestionReducer from './slices/question/EditQuestionSlice';
//QUESTION
import QuestionReducer from './slices/question/GetQuestionsSlice';
import QuestionByIdReducer from './slices/question/GetQuestionsById';
import DeleteQuestionReducer from './slices/question/DeleteQuestionSlice';

//GROUP QUESTION
import GroupQuestionReducer from './slices/InspectionForm/groupQuestions/GetGroupQuestionsFormSlice';
import GroupQuestionByIdReducer from './slices/InspectionForm/groupQuestions/GetGroupQuestionFormByIdSlice';
import EditGroupQuestionReducer from './slices/InspectionForm/groupQuestions/EditGroupQuestionFormSlice';
import DeleteGroupQuestionFormReducer from './slices/InspectionForm/groupQuestions/DeleteGroupQuestionFormSlice';
import loggingUserReducer from "./slices/ui/uiSlices"
//CATALOGS
import CreateCatalogueQuestionReducer from './slices/catalogQuestion/CreateCatalogueQuestionSlice';
import DeleteCatalogueQuestionReducer from './slices/catalogQuestion/DeleteCatalogueQuestionSlice';
import GetAllCatalogueQuestionReducer from './slices/catalogQuestion/GetAllCatalogueQuestionSlice';
//CATALOG QUESTION ITEM
import CreateCatalogQuestionItemReducer from './slices/CatalogQuestionItem/CreateCatalogQuestionItemSlice';
import DeleteCatalogQuestionItemReducer from './slices/CatalogQuestionItem/DeleteCatalogQuestionItemSlice';
import GetCatalogQuestionItemByIdReducer from './slices/CatalogQuestionItem/GetCatalogQuestionItemByIdSlice';
import GetDetailCatalogQuestionItemByIdReducer from './slices/CatalogQuestionItem/GetDetailCatalogQuestionItemByIdSlice';
//DETAIL CATALOG QUESTION
import GetDetailCatalogQuestionReducer from './slices/detailCatalogQuestion/GetDetailCatalogQuestionSlice';
//QUESTION TYPE SLICE
import QuestionTypeReducer from './slices/questionType/questionTypeSlice';
//Login USER SLICE
import LoginUserReducer from './slices/user/LoginUserSlice';

//Cargo Slice
import MostrarCargoReducer from './slices/cargo/MostrarCargoSlice';
import CrearCargoReducer from './slices/cargo/CrearCargoSlice';
import ActualizarCargoReducer from './slices/cargo/ActualizarCargoSlice';
import ObtenerCargoPorIdReducer from './slices/cargo/ObtenerCargoPorIdSlice';
import EliminarCargoReducer from './slices/cargo/EliminarCargoSlice';

//Partido Slice
import MostrarPartidoReducer from './slices/partido/MostrarPartidoSlice';
import CrearPartidoReducer from './slices/partido/CrearPartidoSlice';
import ActualizarPartidoReducer from './slices/partido/ActualizarPartidoSlice';
import EliminarPartidoReducer from './slices/partido/EliminarPartidoSlice';
import ObtenerPartidoPorIdReducer from './slices/partido/ObtenerPartidoPorIdSlice';

//Transparencia Slice
import MostrarTransparenciaReducer from './slices/Transparencia/MostrarTransparenciaSlice';
import CrearTransparenciaReducer from './slices/Transparencia/CrearTransparenciaSlice';
import ActualizarTransparenciaReducer from './slices/Transparencia/ActualizarTransparenciaSlice';
import EliminarTransparenciaReducer from './slices/Transparencia/EliminarTransparenciaSlice';
import ObtenerTransparenciaReducer from './slices/Transparencia/ObtenerTransparenciaSlice';

//Propuesta Slice
import MostrarPropuestaReducer from './slices/propuesta/MostrarPropuestaSlice';
import CrearPropuestaReducer from './slices/propuesta/CrearPropuestaSlice';
import ActualizarPropuestaReducer from './slices/propuesta/ActualizarPropuestaSlice';
import ObtenerPropuestaReducer from './slices/propuesta/ObtenerPropuestaSlice';
import EliminarPropuestaReducer from './slices/propuesta/EliminarPropuestaSlice';

//Candidato Slice
import MostrarCandidatoReducer from './slices/candidato/MostrarCandidatoSlice';
import CreateCandidatoReducer from './slices/candidato/CreateCandidatoSlice';
import ActualizarCandidatoReducer from './slices/candidato/ActualizarCandidatoSlice';
import ObtenerCandidatoReducer from './slices/candidato/ObtenerCandidatoSlice';
import EliminarCandidatoReducer from './slices/candidato/EliminarCandidatoSlice';

//Selector Slice
import KeyValueCandidatoReducer from './slices/KeyValue/KeyValueCandidatoSlice';

export const store = configureStore({
  reducer: {
    //CARGO
    crearCargo: CrearCargoReducer,
    actualizarCargo: ActualizarCargoReducer,
    mostrarCargoPorId: ObtenerCargoPorIdReducer,
    eliminarCargo: EliminarCargoReducer,
    mostrarCargo: MostrarCargoReducer,
    //SELECTOR
    keyValueCandidato: KeyValueCandidatoReducer,
    //PARTIDO
    crearPartido: CrearPartidoReducer,
    mostrarPartido: MostrarPartidoReducer,
    actualizarPartido: ActualizarPartidoReducer,
    eliminarPartido: EliminarPartidoReducer,
    obtenerPartido: ObtenerPartidoPorIdReducer,
    //PROPUESTA
    crearPropuesta: CrearPropuestaReducer,
    actualizarPropuesta: ActualizarPropuestaReducer,
    mostrarPropuesta: MostrarPropuestaReducer,
    eliminarPropuesta: EliminarPropuestaReducer,
    obtenerPorpuesta: ObtenerPropuestaReducer,
    //TRANSPARENCIA
    crearTransparencia: CrearTransparenciaReducer,
    mostrarTransparencia: MostrarTransparenciaReducer,
    actualizarTransparencia: ActualizarTransparenciaReducer,
    eliminarTransparencia: EliminarTransparenciaReducer,
    obtenerTransparencia: ObtenerTransparenciaReducer,
    //CANDIDATO
    crearCandidato: CreateCandidatoReducer,
    mostrarCandidato: MostrarCandidatoReducer,
    actualizarCandidato: ActualizarCandidatoReducer,
    EliminarCandidato: EliminarCandidatoReducer,
    obtenerCandidato: ObtenerCandidatoReducer,
    // CATALOGUE
    catalogueInspectionOrder: CatalogueInspectionOrderReducer,
    catalogueClient: CatalogueClientReducer,
    catalogueRol: CatalogueRolReducer,
    catalogueInspector: CatalogueInspectorReducer,
    getAllFormCatalogs: GetAllFormCatalosReducer,
    getCatalogQuestionInspection: GetCatalogQuestionInspectionReducer,
    getInspectorEdit: getInspectorsEditReducer, 
    getInspectorActive: CatalogueInspectorActiveReducer,
    // INSPECTION ORDER
    createInspection: CreateInspectionReducer,
    editInspectionOrder: EditInspectionReducer,
    getAllInspection: GetAllInspectionReducer,
    getInspectionOrder: GetInspectionOrderReducer,
    deleteInspection: DeleteInspectionReducer,
    // INSPECTION FORM
    getAllInspectionForm: InspectionFormReducer,
    getQuestionAnswerInspection: GetQuestionAnswerInspectionReducer,
    editQuestionAnswerInspection: EditQuestionAnswerInspectionReducer,
    deleteInspectionForm: DeleteInspectionFormReducer,
    getImagesInspection: GetImagesInspectionReducer,
    deleteImageInspection: DeleteImageInspectionReducer,
    uploadImageInspection: UploadImageInspectionReducer,
    getAllInspectionFormById: GetAllInspectionFormByIdReducer,
    // PLANNING
    createPlanning: CreatePlanningReducer,
    getAllPlannings: GetAllPlanningsReducer,
    editPlanning: EditPlanningReducer,
    getPlanning: GetPlanningReducer,
    deletePlanning: DeletePlanningReducer,
    getPlanningByFilter: GetPlanningByFilterReducer,
    // CLIENT
    createClient: CreateClientReducer,
    EditClient: EditClientReducer,
    getAllClient: GetAllClientReducer,
    getClient: GetClientReducer,
    deleteClient: DeleteClientReducer,
    // GET TYPE DOCUMENTS
    getTypeDocuments: getTypeDocumentsCatalogueReducer,
    //FORM
    createForm: CreateFormReducer,
    editForm: EditFormReducer,
    getAllForm: GetAllFormReducer,
    getForm: GetFormReducer,
    deleteForm: DeleteFormReducer,
    catalogueForm: CatalogueFormReducer,
    //TYPE QUESTION
    deleteTypeQuestion: DeleteTypeQuestionReducer,
    createTypeQuestion: CreateTypeQuestionReducer,
    //GROUP QUESTIONS
    getAllGroupQuestion: GroupQuestionReducer,
    getAllGroupQuestionById: GroupQuestionByIdReducer,
    editOrCreateGroupQuestion: EditGroupQuestionReducer,
    deleteGroupQuestion: DeleteGroupQuestionFormReducer,
    LoggingUser: loggingUserReducer,
    //QUESTION
    getAllQuestion: QuestionReducer,
    getQuestion: QuestionByIdReducer,
    editQuestion: EditQuestionReducer,
    deleteQuestion : DeleteQuestionReducer,
    //CATALOG
    createCatalogQuestion: CreateCatalogueQuestionReducer,
    deleteCatalogQuestion: DeleteCatalogueQuestionReducer,
    getAllCatalogQuestion: GetAllCatalogueQuestionReducer,
    //CATALOG QUESTION ITEM
    createCatalogQuestionItem: CreateCatalogQuestionItemReducer,
    deleteCatalogQuestionItem: DeleteCatalogQuestionItemReducer,
    getCatalogQuestionItemById: GetCatalogQuestionItemByIdReducer,
    getDetailCatalogQuestionItemById: GetDetailCatalogQuestionItemByIdReducer,
    //DETAIL CATALOG QUESTION 
    getDetailCatalogQuestion: GetDetailCatalogQuestionReducer,
    //QUESTION TYPE
    getQuestionType: QuestionTypeReducer,
    //USER
    LoginUser: LoginUserReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch