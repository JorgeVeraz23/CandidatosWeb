
// import { API_URL } from '../../../../web.config.js'
import { BASE_URL } from "../../../app/web.example.config";
const API_PREFIX = "api/";
export const URL_API = `${BASE_URL}${API_PREFIX}`;

// INSPECTION
const INSPECTION_PREFIX = "InspectionOrders/";
export const GET_ORDER_INSPECTION_LIST = `${INSPECTION_PREFIX}GetOrderInspectionList`;
export const GETALL_INSPECTIONS = `${INSPECTION_PREFIX}GetAllOrdersOfAll`;
export const GET_INSPECTION = `${INSPECTION_PREFIX}GetOrderInspectionById`;
export const CREATE_INSPECTION = `${INSPECTION_PREFIX}CreateOrder`;
export const EDIT_INSPECTION = `${INSPECTION_PREFIX}EditOrder`;
export const DELETE_INSPECTION = `${INSPECTION_PREFIX}DeleteOrder`;

// INSPECTION FORM
const INSPECTION_FORM_PREFIX = "InspectForm/";
export const GETALL_INSPECTIONFORM = `${INSPECTION_FORM_PREFIX}GetAllInspectionForm`; 
export const GET_QUESTION_ANSWER = `${INSPECTION_FORM_PREFIX}GetQuestionsWithResponseOfInspection`;
export const EDIT_QUESTION_ANSWER = `${INSPECTION_FORM_PREFIX}EditQuestionsWithReponseOfInspection`;
export const DELETE_INSPECTIONFORM = `${INSPECTION_FORM_PREFIX}DeleteInspectionForm`;
export const GETALL_INSPECTIONFORM_BYID = ( idRegistrationFormInspection) => `${INSPECTION_FORM_PREFIX}GetInspectionRegistrationById?IdRegistrationFormInspection=${idRegistrationFormInspection}`;
// IMAGES FORM
const IMAGE_FORM_FORM = "ImagesForm/";
export const GET_IMAGES_INSPECTION = `${IMAGE_FORM_FORM}GetImagesInspection`;
export const DELETE_IMAGEINSPECTION = `${IMAGE_FORM_FORM}DelteImageInspection`;
export const UPDATE_IMAGEINSPECTION = `${IMAGE_FORM_FORM}SaveImageInspectionFromWeb`;
// QUESTION FORM
const QUESTION_FORM = "QuestionsForm/";
export const GET_CATALOG_QUESTION_INSPECTION = `${QUESTION_FORM}CatalogQuestionTypeGroup`;
export const GETALL_TYPE_QUESTION = `${QUESTION_FORM}GetAllTypesQuestion`;
export const GETDETAIL_QUESTION = (idQuestionForm) => `${QUESTION_FORM}GetDetailQuestion?idQuestionForm=${idQuestionForm}`;
export const UPDATE_QUESTION =  `${QUESTION_FORM}UpdateQuestion`;
export const DELETE_QUESTION = (idQuestionForm) => `${QUESTION_FORM}DeleteQuestion?idQuestionForm=${idQuestionForm}`;
// REPORTS
const REPORT_PREFIX = "Reports/";
export const DOWNLOAD_REPORT_PDF_INSPECTION = `${URL_API}${REPORT_PREFIX}ReportePDFInspeccion`;
// GROUP QUESTIONS
export const GROUP_QUESTIONS_FORM_PREFIX = "GroupQuestions";
export const QUESTION_PREFIX = "QuestionsForm"
// PLANNING
const PLANNING_PREFIX = "Plannings/";
export const GETALL_PLANNINGS = `${PLANNING_PREFIX}GetAll`;
export const GET_PLANNING = `${PLANNING_PREFIX}GetById`;
export const CREATE_PLANNING = `${PLANNING_PREFIX}Create`;
export const EDIT_PLANNING = `${PLANNING_PREFIX}Edit`;
export const DELETE_PLANNING = `${PLANNING_PREFIX}Delete`;
export const GET_PLANNINGBYFILTER = (FechaDesde, FechaHasta) => `${PLANNING_PREFIX}GetPlanningsByFilter?FechaDesde=${FechaDesde}&FechaHasta=${FechaHasta}`;



// CLIENTS
const CLIENT_PREFIX = "Clients/";
export const GETALL_CLIENTS = `${CLIENT_PREFIX}GetAllClients`;
//export const DELETE_CLIENTS = `${CLIENT_PREFIX}DeleteClient=`;
export const DELETE_CLIENTS = (idClient) => `${CLIENT_PREFIX}DeleteClient?IdClient=${idClient}`;

export const ADD_OR_MODIFY_CLIENT = `${CLIENT_PREFIX}AddOrModifyClient`;
//export const GET_CLIENT_BY_ID = `${CLIENT_PREFIX}GetClient`;
export const GET_CLIENT_BY_ID = (idClient) => `${CLIENT_PREFIX}GetClient?IdClient=${idClient}`;
// ROLES
const ROLES_PREFIX = "Role/";
export const GETALL_ROLES = `${ROLES_PREFIX}GetList`;

// INSPECTORS
const USERS_PREFIX = "Users/";
export const GETALL_INSPECTORS = `${USERS_PREFIX}GetInspectorList`;
export const GETINSPECTORS_ACTIVES = `${USERS_PREFIX}GetActivesInspectorList`;
export const CHANGE_STATUS_INSPECTORS = (UserName) => `${USERS_PREFIX}ChangeStatusInspector?UserName=${UserName}`;

//Catalogs 
const CATALOGS_PREFIX = "Catalogs/";
export const GETFORM_CATALOGS = `${CATALOGS_PREFIX}GetFormCatalogs`;
export const GETTYPE_DOCUMENTS = `${CATALOGS_PREFIX}GetTypeDocuments`;

//INSPECT FORM
const INSPECTS_PREFIX = "InspectForm/";
export const GETALL_FORMS = `${INSPECTS_PREFIX}GetAllForms`;
export const GET_FORMS_BY_ID = `${INSPECTS_PREFIX}GetAllForms`;
export const EDIT_FORMS = `${INSPECTS_PREFIX}`;
export const SAVE_FORMS = `${INSPECTS_PREFIX}`;
export const DELETE_FORMS = (idInspectionForm) => `${INSPECTS_PREFIX}DesactivateForm?IdInspectForm=${idInspectionForm}`;

export const CREATEQUESTION_ITEM = "";
//TYPE QUESTIONS y CATALOG QUESTION 
const TYPEQUESTIONS_PREFIX = "Catalogs/";
export const CREATECATALOGQUESTION_ITEM = `${TYPEQUESTIONS_PREFIX}CreateCatalogQuestionItem`;
export const DELETEQUESTION_ITEM = (idCatalogQuestionItem) => `${TYPEQUESTIONS_PREFIX}DeleteCatalogQuestionItem?IdCatalogQuestionItem=${idCatalogQuestionItem}`;
export const GETALLCATALOG_QUESTION = `${TYPEQUESTIONS_PREFIX}GetAllCatalogsQuestion`;
export const CREATECATALOG_QUESTION = `${TYPEQUESTIONS_PREFIX}CreateCatalogQuestion`;
export const DELETECATALOG_QUESTION = (idCatalogQuestion) => `${TYPEQUESTIONS_PREFIX}DeleteCatalogQuestion?IdCatalogQuestion=${idCatalogQuestion}`;
export const GETDETAILCATALOG_QUESTION = (idCatalogQuestion) => `${TYPEQUESTIONS_PREFIX}GetDetailCatalogQuestion?IdCatalogQuestion=${idCatalogQuestion}`;
export const GETDETAILITEM_CATALOG = (idCatalogQuestionItem) => `${TYPEQUESTIONS_PREFIX}GetDetailItemCatalog?IdCatalogQuestionItem=${idCatalogQuestionItem}`;
export const GETALLITEMSOF_CATALOG = (idCatalogQuestionItem) => `${TYPEQUESTIONS_PREFIX}GetAllItemsOfCatalog?IdCatalogQuestion=${idCatalogQuestionItem}`;
//Reports
const REPORTS_PREFIX = "Reports/";
export const GETEXCEL_REPORT = (FromDate, ToDate, IdInspectionForm)=> `${BASE_URL}api/${REPORTS_PREFIX}ResumeInspectionReport?FromDate=${FromDate}&ToDate=${ToDate}&IdInspectionForm=${IdInspectionForm}`;


//#region Cargo
const CARGO_PREFIX = "Cargo/";
export const GETALL_CARGO = `${CARGO_PREFIX}GetAllCargo`;
export const CREATE_CARGO = `${CARGO_PREFIX}CrearCargo`;
export const GET_CARGO = (idCargo: number) => `${CARGO_PREFIX}GetCargo?IdCargo=${idCargo}`;
export const DELETE_CARGO = (idCargo: number) => `${CARGO_PREFIX}EliminarCargo?IdCargo=${idCargo}`;
export const UPDATE_CARGO = `${CARGO_PREFIX}ActualizarCargo`;
//#endregion

//#region Candidato
const CANDIDATO_PREFIX = "Candidato/";
export const KEY_VALUE_CANDIDATO = `${CANDIDATO_PREFIX}KeyValueCandidato`;
//#endregion

//#region Partido
const PARTIDO_PREFIX = "Partido/";
export const GETALL_PARTIDOS = `${PARTIDO_PREFIX}GetAllPartido`;
export const CREATE_PARTIDO = `${PARTIDO_PREFIX}CrearPartidos`;
export const GET_PARTIDO = (idPartido: number) => `${PARTIDO_PREFIX}GetPartidos?IdPartido=${idPartido}`;
export const DELETE_PARTIDO = (idPartido: number) => `${PARTIDO_PREFIX}EliminarPartido?IdPartidos=${idPartido}`;
export const UPDATE_PARTIDO = `${PARTIDO_PREFIX}ActualizarPartido`;
//#endregion

//#region Transpariencia
const TRANSPARIENCIA_PREFIX = "Transpariencia/";
export const GETALL_TRANSPARIENCIA = `${TRANSPARIENCIA_PREFIX}GetAllTranspariencia`;
export const CREATE_TRANSPARIENCIA = `${TRANSPARIENCIA_PREFIX}CrearTranspariencia`;
export const GET_TRANSPARIENCIA = (idTranspariencia: number) => `${TRANSPARIENCIA_PREFIX}GetTranspariencia?IdTranspariencia=${idTranspariencia}`;
export const DELETE_TRANSPARIENCIA = (idTranspariencia: number) => `${TRANSPARIENCIA_PREFIX}EliminarTranspariencia?IdTranspariencia=${idTranspariencia}`;
export const UPDATE_TRANSPARIENCIA = `${TRANSPARIENCIA_PREFIX}ActualizarTranspariencia`;
//#endregion



//Security
const SECURITY_PREFIX = "Security/";
export const LOGIN_USUARIO = `${SECURITY_PREFIX}login`;
