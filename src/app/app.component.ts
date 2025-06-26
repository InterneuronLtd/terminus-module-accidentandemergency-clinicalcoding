//BEGIN LICENSE BLOCK 
//Interneuron Terminus

//Copyright(C) 2025  Interneuron Limited

//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.

//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

//See the
//GNU General Public License for more details.

//You should have received a copy of the GNU General Public License
//along with this program.If not, see<http://www.gnu.org/licenses/>.
//END LICENSE BLOCK 
/* Interneuron Observation App
Copyright(C) 2019  Interneuron CIC
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.If not, see<http://www.gnu.org/licenses/>. */

import { Component, OnDestroy, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SubjectsService } from './services/subjects.service';
import { AppService } from './services/app.service';
import { Subscription, Subject } from 'rxjs';
import { ApirequestService } from './services/apirequest.service';
import { isArray } from 'util';
import { PostCodingData } from './model/post-coding-data';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {


  title = 'terminus-module-accidentandemergency-clinicalcoding';
  postCodingData = new PostCodingData();
  subscriptions: Subscription = new Subscription();
  personId: string;

  @Input() set personid(value: string) {
    this.appService.personId = value;
  }
  @Input() set apiservice(value: any) {

    if (!this.appService.appConfig) {
      this.initConfig(value);
    }
    else {
      this.appService.logToConsole("Service reference is being set");
      this.appService.apiService = value;
      this.appService.logToConsole("Service reference is being published");
      this.subjects.apiServiceReferenceChange.next();
      this.appService.logToConsole("personid is being published");
      this.subjects.personIdChange.next();
    }
  }
  @Input() set unload(value: Subject<any>) {
    this.subjects.unload = value;
  }

  constructor(private subjects: SubjectsService, private appService: AppService, private apiRequest: ApirequestService) {
    this.initConfig(null);
    this.subjects.personIdChange.subscribe(() => {
      //this.personId = this.appService.personId;
      this.personId = '9f1bb2c8-de89-439b-8d38-ed371ce108ed';
      this.getCodingDetails();
    });
  }

  getCodingDetails() {
    this.hideAllDiagnosis();

    this.subscriptions.add(this.apiRequest.getRequest(this.appService.baseURI + this.appService.getAnECodingURI + this.personId)
      .subscribe((response) => {
        //console.log(JSON.parse(response)[0]);
        this.postCodingData = <PostCodingData>JSON.parse(response);
        //console.log(this.postCodingData);

        $('#ddlMainCategory').val(this.postCodingData.maindiagnosis);
        $('#ddlDisposal').val(this.postCodingData.disposal);
        $('#ddlDisposalWard').val(this.postCodingData.disposalward);
        $('#ddlReviewingDoctor').val(this.postCodingData.reviewingdoctor);
        $('#txtDischargeComments').val(this.postCodingData.comments);
        


        this.tickCheckBoxesInDiv('div_InformationCategory_Assault', JSON.parse(this.postCodingData.informationcategoryarray));
        this.tickCheckBoxesInDiv('div_InformationCategory_RTC', JSON.parse(this.postCodingData.informationcategoryarray));
        this.tickCheckBoxesInDiv('div_InformationCategory_CardiacArrest', JSON.parse(this.postCodingData.informationcategoryarray));
        this.tickCheckBoxesInDiv('div_InformationCategory_MajorTrauma', JSON.parse(this.postCodingData.informationcategoryarray));
        this.tickCheckBoxesInDiv('div_InformationCategory_TeachingCase', JSON.parse(this.postCodingData.informationcategoryarray));
        this.tickCheckBoxesInDiv('div_InformationCategory_AlcoholRelated', JSON.parse(this.postCodingData.informationcategoryarray));
        this.tickCheckBoxesInDiv('div_SeniorReview_DischargeofAtraumaticChestPain', JSON.parse(this.postCodingData.seniorreviewarray));
        this.tickCheckBoxesInDiv('div_SeniorReview_DischargeofChildUnder1withMedicalCondition', JSON.parse(this.postCodingData.seniorreviewarray));
        this.tickCheckBoxesInDiv('div_SeniorReview_DischargeofPatientPreAttendedinlast72Hours', JSON.parse(this.postCodingData.seniorreviewarray));
        this.tickCheckBoxesInDiv('div_SeniorReview_Other', JSON.parse(this.postCodingData.seniorreviewarray));
        this.tickCheckBoxesInDiv('div_SeniorReview_SeniorReviewRequired', JSON.parse(this.postCodingData.seniorreviewarray));
        this.tickCheckBoxesInDiv('div_DischargePlanning_ChildWelfareFormYes', JSON.parse(this.postCodingData.dischargeplanningarray));
        this.tickCheckBoxesInDiv('div_DischargeNow_LeftDepartmentNow', JSON.parse(this.postCodingData.dischargenowarray));

        this.tickCheckBoxesInDiv('div_Injuries_Abrasion', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_Biteorsting', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_Burns', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_ChemicalInjurySkin', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_ClosedFracture', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_Dislocation', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_ElectricShock', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_ForeignBody', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_Haematoma', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_MinorHeadInjury', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_OpenFracture', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_SoftTissueInjuryorSprain', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_Tendonitis', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Injuries_Wound', JSON.parse(this.postCodingData.injuriesarray));
        this.tickCheckBoxesInDiv('div_Medicine_ACS', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_Anaemia', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_AnaphylaxisorAllergicReaction', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_Arrhythmia', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_Asthma', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_ChestInfectionorPneumonia', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_Convulsion', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_COPD', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_CVA', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_DKA', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_DVT', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_ElectrolyteImbalance', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_Gastritis', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_Gastroenteritis', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_IntracranialBleed', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_IntracranialInfection', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_MetabolicDisturbance', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_MI', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_NeutroponicSepsis', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_PE', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_Pneumothorax', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_SickleCellCrisis', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_SoftTissueInfection', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_TIA', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_UpperGIBleed', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_Vasovagal', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_OtherCardiacCondition', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_OtherCNSCondiiton', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_OtherHaematologicalCondition', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_Medicine_OtherRespiratoryCondition', JSON.parse(this.postCodingData.medicinearray));
        this.tickCheckBoxesInDiv('div_MinorIllness_Abscess', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_ALTE', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_Choking', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_Constipation', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_Croup', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_Epistaxis', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_FebrileConvulsion', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_Headache', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_Impertigo', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_NonspecificAbdoPain', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_NonspecificChestPain', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_OtherDermatologicalCondition', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_OtisMediaorExterna', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_SoftTissueInflamation', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_URTIorTonsiilitis', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_UTI', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_ViralIllness', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_ViralRash', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_MinorIllness_OtherENTCondition', JSON.parse(this.postCodingData.minorilnessarray));
        this.tickCheckBoxesInDiv('div_ObsandGynae_AbdoPaininPregnancy', JSON.parse(this.postCodingData.obsandgynaearray));
        this.tickCheckBoxesInDiv('div_ObsandGynae_EctopicPregancy', JSON.parse(this.postCodingData.obsandgynaearray));
        this.tickCheckBoxesInDiv('div_ObsandGynae_HypermesisinPreganancy', JSON.parse(this.postCodingData.obsandgynaearray));
        this.tickCheckBoxesInDiv('div_ObsandGynae_OvarianCyst', JSON.parse(this.postCodingData.obsandgynaearray));
        this.tickCheckBoxesInDiv('div_ObsandGynae_PostOpProblem', JSON.parse(this.postCodingData.obsandgynaearray));
        this.tickCheckBoxesInDiv('div_ObsandGynae_PVBleedinginPregancy', JSON.parse(this.postCodingData.obsandgynaearray));
        this.tickCheckBoxesInDiv('div_ObsandGynae_SuspectedEptopicPregancy', JSON.parse(this.postCodingData.obsandgynaearray));
        this.tickCheckBoxesInDiv('div_ObsandGynae_OtherGynaecologicalCondition', JSON.parse(this.postCodingData.obsandgynaearray));
        this.tickCheckBoxesInDiv('div_ObsandGynae_OtherObstetricCondition', JSON.parse(this.postCodingData.obsandgynaearray));
        this.tickCheckBoxesInDiv('div_Ophthalmology_Conjunctivitis', JSON.parse(this.postCodingData.ophthalmologyarray));
        this.tickCheckBoxesInDiv('div_Ophthalmology_CornealAbrasion', JSON.parse(this.postCodingData.ophthalmologyarray));
        this.tickCheckBoxesInDiv('div_Ophthalmology_CornealForeignBody', JSON.parse(this.postCodingData.ophthalmologyarray));
        this.tickCheckBoxesInDiv('div_Ophthalmology_RedEye', JSON.parse(this.postCodingData.ophthalmologyarray));
        this.tickCheckBoxesInDiv('div_Ophthalmology_RetinalDetachment', JSON.parse(this.postCodingData.ophthalmologyarray));
        this.tickCheckBoxesInDiv('div_Ophthalmology_OtherOphthalmologicalCondition', JSON.parse(this.postCodingData.ophthalmologyarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_AtraumaticBackPain', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_Bursitis', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_CartliageInjuryKnee', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_CaudaEquina', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_Costochondritis', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_LigamentInjuryKnee', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_LockedKnee', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_Osteomyelitis', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_PostOpProblem', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_Sciatica', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_SepticArthritis', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Orthopaedics_OtherOrthopaedicCondition', JSON.parse(this.postCodingData.orthopaedicsarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_AlcoholAbuse', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_Anxiety', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_Depression', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_DrugAbuse', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_Overdose', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_Paranoia', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_PoisoningControlledDrugs', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_PoisoningOther', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_PoisoningPrescriptiveDrugs', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_PoisoningProprietryDrugs', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_Suicidal', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Psychiatry_OtherPsychiatricCondition', JSON.parse(this.postCodingData.psychiatryarray));
        this.tickCheckBoxesInDiv('div_Surgery_AnalProblem', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_Appendicitis', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_BiliaryColicorCholescystitis', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_BowelObstruction', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_Diverticulitis', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_Hernia', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_IschaemicBowel', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_IschaemicLimb', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_LowerGIBleed', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_Pancreatitis', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_Perforation', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_PostOpProblem', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_SuspectedAppendicitis', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Surgery_OtherSurgicalCondition', JSON.parse(this.postCodingData.surgeryarray));
        this.tickCheckBoxesInDiv('div_Urology_CatheterProblem', JSON.parse(this.postCodingData.urologyarray));
        this.tickCheckBoxesInDiv('div_Urology_Epididymoorchitis', JSON.parse(this.postCodingData.urologyarray));
        this.tickCheckBoxesInDiv('div_Urology_Paraphimosis', JSON.parse(this.postCodingData.urologyarray));
        this.tickCheckBoxesInDiv('div_Urology_Pyelonephritis', JSON.parse(this.postCodingData.urologyarray));
        this.tickCheckBoxesInDiv('div_Urology_RenalColic', JSON.parse(this.postCodingData.urologyarray));
        this.tickCheckBoxesInDiv('div_Urology_TesticularTorsion', JSON.parse(this.postCodingData.urologyarray));
        this.tickCheckBoxesInDiv('div_Urology_UrinaryRetention', JSON.parse(this.postCodingData.urologyarray));
        this.tickCheckBoxesInDiv('div_Urology_UTI', JSON.parse(this.postCodingData.urologyarray));
        this.tickCheckBoxesInDiv('div_Urology_OtherUroligicalCondition', JSON.parse(this.postCodingData.urologyarray));
        this.tickCheckBoxesInDiv('div_OtherCategory_NAD', JSON.parse(this.postCodingData.othercategoryarray));
        this.tickCheckBoxesInDiv('div_OtherCategory_Didnotwait', JSON.parse(this.postCodingData.othercategoryarray));
        this.tickCheckBoxesInDiv('div_OtherCategory_Referredtospecialty', JSON.parse(this.postCodingData.othercategoryarray));





        this.tickCheckBoxesInDiv('div_Monitoring_Oxygen', JSON.parse(this.postCodingData.monitoringarray));
        this.tickCheckBoxesInDiv('div_Monitoring_RecordingObservation', JSON.parse(this.postCodingData.monitoringarray));
        this.tickCheckBoxesInDiv('div_Monitoring_IVCannula', JSON.parse(this.postCodingData.monitoringarray));
        this.tickCheckBoxesInDiv('div_Monitoring_SerialECGs', JSON.parse(this.postCodingData.monitoringarray));
        this.tickCheckBoxesInDiv('div_Monitoring_CardiacMonitoring', JSON.parse(this.postCodingData.monitoringarray));
        this.tickCheckBoxesInDiv('div_Monitoring_HeadInjuryObservation', JSON.parse(this.postCodingData.monitoringarray));
        this.tickCheckBoxesInDiv('div_Monitoring_NIV', JSON.parse(this.postCodingData.monitoringarray));
        this.tickCheckBoxesInDiv('div_Monitoring_Catheterisation', JSON.parse(this.postCodingData.monitoringarray));
        this.tickCheckBoxesInDiv('div_MinorTreatments_WoundClean', JSON.parse(this.postCodingData.minortreatmentsarray));
        this.tickCheckBoxesInDiv('div_MinorTreatments_DressingofMinorWoundBurn', JSON.parse(this.postCodingData.minortreatmentsarray));
        this.tickCheckBoxesInDiv('div_MinorTreatments_DressingofMajorWoundBurn', JSON.parse(this.postCodingData.minortreatmentsarray));
        this.tickCheckBoxesInDiv('div_MinorTreatments_Sling', JSON.parse(this.postCodingData.minortreatmentsarray));
        this.tickCheckBoxesInDiv('div_MinorTreatments_BandageSupport', JSON.parse(this.postCodingData.minortreatmentsarray));
        this.tickCheckBoxesInDiv('div_MinorTreatments_Splint', JSON.parse(this.postCodingData.minortreatmentsarray));
        this.tickCheckBoxesInDiv('div_MinorTreatments_ApplicationofPOP', JSON.parse(this.postCodingData.minortreatmentsarray));
        this.tickCheckBoxesInDiv('div_MinorTreatments_RemovalofPOP', JSON.parse(this.postCodingData.minortreatmentsarray));
        this.tickCheckBoxesInDiv('div_WoundClosures_Steristips', JSON.parse(this.postCodingData.woundclosuresarray));
        this.tickCheckBoxesInDiv('div_WoundClosures_WoundGlue', JSON.parse(this.postCodingData.woundclosuresarray));
        this.tickCheckBoxesInDiv('div_WoundClosures_Sutures', JSON.parse(this.postCodingData.woundclosuresarray));
        this.tickCheckBoxesInDiv('div_WoundClosures_WoundClosureOther', JSON.parse(this.postCodingData.woundclosuresarray));
        this.tickCheckBoxesInDiv('div_WoundClosures_RemovalofSutures', JSON.parse(this.postCodingData.woundclosuresarray));
        this.tickCheckBoxesInDiv('div_WoundClosures_Clips', JSON.parse(this.postCodingData.woundclosuresarray));
        this.tickCheckBoxesInDiv('div_Procedures_RemovalofFB', JSON.parse(this.postCodingData.proceduresarray));
        this.tickCheckBoxesInDiv('div_Procedures_InicissionandDrainage', JSON.parse(this.postCodingData.proceduresarray));
        this.tickCheckBoxesInDiv('div_Procedures_MinorSurgery', JSON.parse(this.postCodingData.proceduresarray));
        this.tickCheckBoxesInDiv('div_Procedures_ManipulationofLowerLimb', JSON.parse(this.postCodingData.proceduresarray));
        this.tickCheckBoxesInDiv('div_Procedures_ManipulationofUpperLimb', JSON.parse(this.postCodingData.proceduresarray));
        this.tickCheckBoxesInDiv('div_Procedures_ReductionofDislocation', JSON.parse(this.postCodingData.proceduresarray));
        this.tickCheckBoxesInDiv('div_Procedures_EyeIrrigation', JSON.parse(this.postCodingData.proceduresarray));
        this.tickCheckBoxesInDiv('div_Procedures_EpistaxisControl', JSON.parse(this.postCodingData.proceduresarray));
        this.tickCheckBoxesInDiv('div_AdditionalTreatments_TetanusImmune', JSON.parse(this.postCodingData.additionaltreatmentsarray));
        this.tickCheckBoxesInDiv('div_AdditionalTreatments_TetanusDiptheriaBooster', JSON.parse(this.postCodingData.additionaltreatmentsarray));
        this.tickCheckBoxesInDiv('div_AdditionalTreatments_TetanusImmunoglobulins', JSON.parse(this.postCodingData.additionaltreatmentsarray));
        this.tickCheckBoxesInDiv('div_AdditionalTreatments_Charcoal', JSON.parse(this.postCodingData.additionaltreatmentsarray));
        this.tickCheckBoxesInDiv('div_AdditionalTreatments_Thrombolysis', JSON.parse(this.postCodingData.additionaltreatmentsarray));
        this.tickCheckBoxesInDiv('div_AdditionalTreatments_DentalTreatment', JSON.parse(this.postCodingData.additionaltreatmentsarray));
        this.tickCheckBoxesInDiv('div_Anaesthesia_Entonox', JSON.parse(this.postCodingData.anaesthesiaarray));
        this.tickCheckBoxesInDiv('div_Anaesthesia_LA', JSON.parse(this.postCodingData.anaesthesiaarray));
        this.tickCheckBoxesInDiv('div_Anaesthesia_Sedation', JSON.parse(this.postCodingData.anaesthesiaarray));
        this.tickCheckBoxesInDiv('div_Anaesthesia_GA', JSON.parse(this.postCodingData.anaesthesiaarray));
        this.tickCheckBoxesInDiv('div_Anaesthesia_RegionalBlock', JSON.parse(this.postCodingData.anaesthesiaarray));
        this.tickCheckBoxesInDiv('div_Medication_NebuliserSpacer', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_OralMedication', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_IVDrug', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_IMDrug', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_SCDrug', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_PRDrug', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_SLDrug', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_IntranasalDrug', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_EyeDrops', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_EarDrops', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_IVInfusionFluids', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_Blood', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_IVInfusionDrugs', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_Medication_TTOs', JSON.parse(this.postCodingData.medicationarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_OralAirway', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_NasalAirway', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_BagValveMask', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_CPR', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_Defibrillation', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_IntubationRSI', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_ChestDrain', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_Pericardiocentesis', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_CentralLine', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_ArterialLine', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_ExternalPlacing', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_LifeSupport_ActiveRewarming', JSON.parse(this.postCodingData.lifesupportarray));
        this.tickCheckBoxesInDiv('div_Discharge_VerbalAdvice', JSON.parse(this.postCodingData.dischargearray));
        this.tickCheckBoxesInDiv('div_Discharge_WrittenAdvice', JSON.parse(this.postCodingData.dischargearray));
        this.tickCheckBoxesInDiv('div_Discharge_OTAssessment', JSON.parse(this.postCodingData.dischargearray));
        this.tickCheckBoxesInDiv('div_Discharge_SocialWorkerAssessment', JSON.parse(this.postCodingData.dischargearray));
        this.tickCheckBoxesInDiv('div_Discharge_Crutches', JSON.parse(this.postCodingData.dischargearray));
        this.tickCheckBoxesInDiv('div_Discharge_NoTreatment', JSON.parse(this.postCodingData.dischargearray));

        this.tickCheckBoxesInDiv('div_Investigation_ABG', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_Biochemistry', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_BloodCultures', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_CardiacEnzymes', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_ClottingStudies', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_CrossMatchorXMatch', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_CT', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_ECG', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_GroupandSave', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_Haematology', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_MRI', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_PregancyTest', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_Toxicology', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_Urinalysis', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_USS', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_XRay', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_AnyOtherInvrstigation', JSON.parse(this.postCodingData.investigationarray));
        this.tickCheckBoxesInDiv('div_Investigation_None', JSON.parse(this.postCodingData.investigationarray));

        this.tickCheckBoxesInDiv('div_HeadandNeck_Brain', JSON.parse(this.postCodingData.headandneckarray));
        this.tickCheckBoxesInDiv('div_HeadandNeck_Ear', JSON.parse(this.postCodingData.headandneckarray));
        this.tickCheckBoxesInDiv('div_HeadandNeck_Eyes', JSON.parse(this.postCodingData.headandneckarray));
        this.tickCheckBoxesInDiv('div_HeadandNeck_Face', JSON.parse(this.postCodingData.headandneckarray));
        this.tickCheckBoxesInDiv('div_HeadandNeck_Head', JSON.parse(this.postCodingData.headandneckarray));
        this.tickCheckBoxesInDiv('div_HeadandNeck_MouthorJaw', JSON.parse(this.postCodingData.headandneckarray));
        this.tickCheckBoxesInDiv('div_HeadandNeck_Neck', JSON.parse(this.postCodingData.headandneckarray));
        this.tickCheckBoxesInDiv('div_HeadandNeck_Nose', JSON.parse(this.postCodingData.headandneckarray));
        this.tickCheckBoxesInDiv('div_HeadandNeck_Throat', JSON.parse(this.postCodingData.headandneckarray));
        this.tickCheckBoxesInDiv('div_LowerLimb_Ankle', JSON.parse(this.postCodingData.lowerlimbarray));
        this.tickCheckBoxesInDiv('div_LowerLimb_Foot', JSON.parse(this.postCodingData.lowerlimbarray));
        this.tickCheckBoxesInDiv('div_LowerLimb_Groin', JSON.parse(this.postCodingData.lowerlimbarray));
        this.tickCheckBoxesInDiv('div_LowerLimb_Hip', JSON.parse(this.postCodingData.lowerlimbarray));
        this.tickCheckBoxesInDiv('div_LowerLimb_Knee', JSON.parse(this.postCodingData.lowerlimbarray));
        this.tickCheckBoxesInDiv('div_LowerLimb_LowerLeg', JSON.parse(this.postCodingData.lowerlimbarray));
        this.tickCheckBoxesInDiv('div_LowerLimb_Thigh', JSON.parse(this.postCodingData.lowerlimbarray));
        this.tickCheckBoxesInDiv('div_LowerLimb_Toe', JSON.parse(this.postCodingData.lowerlimbarray));
        this.tickCheckBoxesInDiv('div_Trunk_Abdomen', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_Trunk_AnoRectal', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_Trunk_Breast', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_Trunk_Buttocks', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_Trunk_CSpine', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_Trunk_Chest', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_Trunk_Genitalia', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_Trunk_LSpine', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_Trunk_Pelvis', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_Trunk_TSpine', JSON.parse(this.postCodingData.trunkarray));
        this.tickCheckBoxesInDiv('div_UpperLimb_Elbow', JSON.parse(this.postCodingData.upperlimbarray));
        this.tickCheckBoxesInDiv('div_UpperLimb_Finger', JSON.parse(this.postCodingData.upperlimbarray));
        this.tickCheckBoxesInDiv('div_UpperLimb_Forearm', JSON.parse(this.postCodingData.upperlimbarray));
        this.tickCheckBoxesInDiv('div_UpperLimb_Hand', JSON.parse(this.postCodingData.upperlimbarray));
        this.tickCheckBoxesInDiv('div_UpperLimb_Shoulder', JSON.parse(this.postCodingData.upperlimbarray));
        this.tickCheckBoxesInDiv('div_UpperLimb_Thumb', JSON.parse(this.postCodingData.upperlimbarray));
        this.tickCheckBoxesInDiv('div_UpperLimb_UpperArm', JSON.parse(this.postCodingData.upperlimbarray));
        this.tickCheckBoxesInDiv('div_UpperLimb_Wrist', JSON.parse(this.postCodingData.upperlimbarray));
        this.tickCheckBoxesInDiv('div_Laterallity_Left', JSON.parse(this.postCodingData.laterallityarray));
        this.tickCheckBoxesInDiv('div_Laterallity_Right', JSON.parse(this.postCodingData.laterallityarray));
        this.tickCheckBoxesInDiv('div_Laterallity_Bilateral', JSON.parse(this.postCodingData.laterallityarray));
        this.tickCheckBoxesInDiv('div_Laterallity_NotApplicable', JSON.parse(this.postCodingData.laterallityarray));



        var diagnosis = $('#ddlMainCategory').val();



        if (diagnosis == "") {
          return;
        }
        this.showDiagnosis(diagnosis);
        $("#isLocked").show();
        $("#btnUnlock").show();
        $('#ddlMainCategory').attr('disabled', true);


        var DiagnosisArray = JSON.parse(this.postCodingData.diagnosisarray);
        $("#lblDiagnosisArray").text(DiagnosisArray);
        if (!DiagnosisArray) {
          $("#lblDiagnosisStatus").html("<span class='text-danger'>Not Started</span>");
        }
        else {
          $("#lblDiagnosisStatus").html("<span class='text-success'>Completed</span>");
        }

        var InvestigationArray = JSON.parse(this.postCodingData.investigationarray);
        $("#lblInvestigationsArray").text(InvestigationArray);
        if (!InvestigationArray) {
          $("#lblInvestigationsStatus").html("<span class='text-danger'>Not Started</span>");
        }
        else {
          $("#lblInvestigationsStatus").html("<span class='text-success'>Completed</span>");
        }

        var TreatmentsArray = JSON.parse(this.postCodingData.treatmentsarray);
        $("#lblTreatmentsArray").text(TreatmentsArray);
        if (!TreatmentsArray) {
          $("#lblTreatmentsStatus").html("<span class='text-danger'>Not Started</span>");
        }
        else {
          $("#lblTreatmentsStatus").html("<span class='text-success'>Completed</span>");
        }

        var seniorreviewarray = this.postCodingData.seniorreviewarray;
        if (seniorreviewarray) {
          $("#lblSeniorReviewStatus").html("Senior Review Required");
        }
        else {
          $("#lblSeniorReviewStatus").html("");
        }

        var disposal = this.postCodingData.disposal;
        if (!disposal) {
          $("#lblDischargeStatus").html("<span class='text-danger'>Discharge Uncompleted</span>");
        }
        else {
          $("#lblDischargeStatus").html("<span class='text-success'>Discharge Completed</span>");
        }

      }
      ))
  };

  hideAllDiagnosis() {
    $('#Injuries').hide();
    $('#Medicine').hide();
    $('#MinorIllness').hide();
    $('#ObsandGynae').hide();
    $('#Ophthalmology').hide();
    $('#Orthopaedics').hide();
    $('#OtherCategory').hide();
    $('#Psychiatry').hide();
    $('#Surgery').hide();
    $('#Urology').hide();
    $('#AnatomicalArea').hide();

    $('#AnatomicalAreaLaterality').hide();
    // $('#UpperLimb').hide();
    // $('#Trunk').hide();
    // $('#LowerLimb').hide();
    // $('#Laterallity').hide();

    $('#noDiagnosis').show();

    $('#MainDiagnosis').removeClass('pale-yellow-color');
    $('#MainDiagnosis').removeClass('light-green-color');
    $('#MainDiagnosis').removeClass('aqua-color');
    $('#MainDiagnosis').removeClass('light-purple-color');
    $('#MainDiagnosis').removeClass('pink-color');
    $('#MainDiagnosis').removeClass('pale-green-color');
    $('#MainDiagnosis').removeClass('beige-color');
    $('#MainDiagnosis').removeClass('pale-pink-color');
    $('#MainDiagnosis').removeClass('psychiatry-color');
    $('#MainDiagnosis').removeClass('salmon-color');
    $('#MainDiagnosis').removeClass('amber-color');
    $('#MainDiagnosis').removeClass('mauve-color');
    $('#MainDiagnosis').removeClass('gray-purple-color');

  }

  showDiagnosis(diagnosis) {

    diagnosis = diagnosis.replace(/ /g, '');

    //console.log(diagnosis);
    $('#' + diagnosis).show();
    if (diagnosis == "Injuries") {
      $('#AnatomicalAreaLaterality').show();
    }
    $('#noDiagnosis').hide();

    switch (diagnosis) {
      case 'Injuries':
        $('#MainDiagnosis').addClass('pale-yellow-color');
        break;
      case 'Medicine':
        $('#MainDiagnosis').addClass('aqua-color');
        break;
      case 'MinorIllness':
        $('#MainDiagnosis').addClass('light-purple-color');
        break;
      case 'ObsandGynae':
        $('#MainDiagnosis').addClass('pink-color');
        break;
      case 'Ophthalmology':
        $('#MainDiagnosis').addClass('pale-green-color');
        break;
      case 'Orthopaedics':
        $('#MainDiagnosis').addClass('beige-color');
        break;
      case 'Psychiatry':
        $('#MainDiagnosis').addClass('mauve-color');
        break;
      case 'Surgery':
        $('#MainDiagnosis').addClass('salmon-color');
        break;
      case 'Urology':
        $('#MainDiagnosis').addClass('amber-color');
        break;
      case 'OtherCategory':
        $('#MainDiagnosis').addClass('gray-purple-color');
        break;
        Default:
        $('#MainDiagnosis').addClass('bg-white');
        break;

    }
  }


  clearForm() {
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


  tickCheckBoxesInDiv(div, array) {
    $('#' + div + ' input:checkbox').each(function () { var state = $.inArray(this.value, array) != -1; $(this).prop('checked', state); });
  }

  initConfig(value: any) {

    this.appService.apiService = value;

    if (this.appService.apiService) {
      let decodedToken = this.appService.decodeAccessToken(this.appService.apiService.authService.user.access_token);
      if (decodedToken != null)
        this.appService.loggedInUserName = decodedToken.name ? (isArray(decodedToken.name) ? decodedToken.name[0] : decodedToken.name) : decodedToken.IPUId;
    }
    this.subscriptions.add(this.apiRequest.getRequest("./assets/config/AandEClinicalCodingConfig.json").subscribe(
      (response) => {
        this.appService.appConfig = response;
        this.appService.baseURI = this.appService.appConfig.uris.baseuri;
        this.appService.autonomicsBaseURI = this.appService.appConfig.uris.autonomicsbaseuri;
        this.appService.enableLogging = this.appService.appConfig.enablelogging;

        this.appService.postAnECodingURI = this.appService.appConfig.uris.postaneencounteruri;
        this.appService.postAnECodingURI = this.appService.appConfig.uris.postanecodinguri;
        this.appService.getAnECodingURI = this.appService.appConfig.uris.getclinicaldetailsuri;


        //emit events after getting initial config. //this happens on first load only. 
        this.appService.logToConsole("Service reference is being published from init config");
        this.subjects.apiServiceReferenceChange.next();
        this.appService.logToConsole("personid is being published from init config");
        this.subjects.personIdChange.next();
      }));
  }

  ngOnDestroy() {
    this.appService.logToConsole("app component being unloaded");
    this.appService.personId = null;

    this.subscriptions.unsubscribe();
    this.subjects.unload.next("app-accidentandemergency-clinicalcoding");
  }






  ngOnInit() {

    var self = this;

    //var person_id = "123-456-7890";
    var DiagnosisArray = [];
    var InvestigationArray = [];
    var TreatmentsArray = [];
    var InjuriesArray = [];
    var MedicineArray = [];
    var MinorIlnessArray = [];
    var ObsandGynaeArray = [];
    var OphthalmologyArray = [];
    var OrthopaedicsArray = [];
    var OtherCategoryArray = [];
    var PsychiatryArray = [];
    var SurgeryArray = [];
    var UrologyArray = [];
    var AnatomicalAreaArray = [];
    var AdditionalTreatmentsArray = [];
    var AnaesthesiaArray = [];
    var DischargeArray = [];
    var LifeSupportArray = [];
    var MedicationArray = [];
    var MinorTreatmentsArray = [];
    var MonitoringArray = [];
    var ProceduresArray = [];
    var WoundClosuresArray = [];
    var HeadandNeckArray = [];
    var UpperLimbArray = [];
    var TrunkArray = [];
    var LowerLimbArray = [];
    var LaterallityArray = [];
    var InformationCategoryArray = [];
    var SeniorReviewArray = [];
    var DischargePlanningArray = [];
    var DischargeNowArray = [];

    var MainDiagnosis = "";
    var ReviewingDoctor = "";
    var Disposal = "";
    var DisposalWard = "";
    var Comments = "";



    function showDiagnosis(diagnosis) {

      diagnosis = diagnosis.replace(/ /g, '');

      //console.log(diagnosis);
      $('#' + diagnosis).show();
      if (diagnosis == "Injuries") {
        $('#AnatomicalAreaLaterality').show();
      }
      $('#noDiagnosis').hide();

      switch (diagnosis) {
        case 'Injuries':
          $('#MainDiagnosis').addClass('pale-yellow-color');
          break;
        case 'Medicine':
          $('#MainDiagnosis').addClass('aqua-color');
          break;
        case 'MinorIllness':
          $('#MainDiagnosis').addClass('light-purple-color');
          break;
        case 'ObsandGynae':
          $('#MainDiagnosis').addClass('pink-color');
          break;
        case 'Ophthalmology':
          $('#MainDiagnosis').addClass('pale-green-color');
          break;
        case 'Orthopaedics':
          $('#MainDiagnosis').addClass('beige-color');
          break;
        case 'Psychiatry':
          $('#MainDiagnosis').addClass('mauve-color');
          break;
        case 'Surgery':
          $('#MainDiagnosis').addClass('salmon-color');
          break;
        case 'Urology':
          $('#MainDiagnosis').addClass('amber-color');
          break;
        case 'OtherCategory':
          $('#MainDiagnosis').addClass('gray-purple-color');
          break;
          Default:
          $('#MainDiagnosis').addClass('bg-white');
          break;

      }
    }

    function hideAllDiagnosis() {
      $('#Injuries').hide();
      $('#Medicine').hide();
      $('#MinorIllness').hide();
      $('#ObsandGynae').hide();
      $('#Ophthalmology').hide();
      $('#Orthopaedics').hide();
      $('#OtherCategory').hide();
      $('#Psychiatry').hide();
      $('#Surgery').hide();
      $('#Urology').hide();
      $('#AnatomicalArea').hide();

      $('#AnatomicalAreaLaterality').hide();
      // $('#UpperLimb').hide();
      // $('#Trunk').hide();
      // $('#LowerLimb').hide();
      // $('#Laterallity').hide();

      $('#noDiagnosis').show();

      $('#MainDiagnosis').removeClass('pale-yellow-color');
      $('#MainDiagnosis').removeClass('light-green-color');
      $('#MainDiagnosis').removeClass('aqua-color');
      $('#MainDiagnosis').removeClass('light-purple-color');
      $('#MainDiagnosis').removeClass('pink-color');
      $('#MainDiagnosis').removeClass('pale-green-color');
      $('#MainDiagnosis').removeClass('beige-color');
      $('#MainDiagnosis').removeClass('pale-pink-color');
      $('#MainDiagnosis').removeClass('psychiatry-color');
      $('#MainDiagnosis').removeClass('salmon-color');
      $('#MainDiagnosis').removeClass('amber-color');
      $('#MainDiagnosis').removeClass('mauve-color');
      $('#MainDiagnosis').removeClass('gray-purple-color');

    }


    function UntickInjuries() {
      tickCheckBoxesInDiv('div_Injuries_Abrasion', []);
      tickCheckBoxesInDiv('div_Injuries_Biteorsting', []);
      tickCheckBoxesInDiv('div_Injuries_Burns', []);
      tickCheckBoxesInDiv('div_Injuries_ChemicalInjurySkin', []);
      tickCheckBoxesInDiv('div_Injuries_ClosedFracture', []);
      tickCheckBoxesInDiv('div_Injuries_Dislocation', []);
      tickCheckBoxesInDiv('div_Injuries_ElectricShock', []);
      tickCheckBoxesInDiv('div_Injuries_ForeignBody', []);
      tickCheckBoxesInDiv('div_Injuries_Haematoma', []);
      tickCheckBoxesInDiv('div_Injuries_MinorHeadInjury', []);
      tickCheckBoxesInDiv('div_Injuries_OpenFracture', []);
      tickCheckBoxesInDiv('div_Injuries_SoftTissueInjuryorSprain', []);
      tickCheckBoxesInDiv('div_Injuries_Tendonitis', []);
      tickCheckBoxesInDiv('div_Injuries_Wound', []);
      tickCheckBoxesInDiv('div_Medicine_ACS', []);
      tickCheckBoxesInDiv('div_Medicine_Anaemia', []);
      tickCheckBoxesInDiv('div_Medicine_AnaphylaxisorAllergicReaction', []);
      tickCheckBoxesInDiv('div_Medicine_Arrhythmia', []);
      tickCheckBoxesInDiv('div_Medicine_Asthma', []);
      tickCheckBoxesInDiv('div_Medicine_ChestInfectionorPneumonia', []);
      tickCheckBoxesInDiv('div_Medicine_Convulsion', []);
      tickCheckBoxesInDiv('div_Medicine_COPD', []);
      tickCheckBoxesInDiv('div_Medicine_CVA', []);
      tickCheckBoxesInDiv('div_Medicine_DKA', []);
      tickCheckBoxesInDiv('div_Medicine_DVT', []);
      tickCheckBoxesInDiv('div_Medicine_ElectrolyteImbalance', []);
      tickCheckBoxesInDiv('div_Medicine_Gastritis', []);
      tickCheckBoxesInDiv('div_Medicine_Gastroenteritis', []);
      tickCheckBoxesInDiv('div_Medicine_IntracranialBleed', []);
      tickCheckBoxesInDiv('div_Medicine_IntracranialInfection', []);
      tickCheckBoxesInDiv('div_Medicine_MetabolicDisturbance', []);
      tickCheckBoxesInDiv('div_Medicine_MI', []);
      tickCheckBoxesInDiv('div_Medicine_NeutroponicSepsis', []);
      tickCheckBoxesInDiv('div_Medicine_PE', []);
      tickCheckBoxesInDiv('div_Medicine_Pneumothorax', []);
      tickCheckBoxesInDiv('div_Medicine_SickleCellCrisis', []);
      tickCheckBoxesInDiv('div_Medicine_SoftTissueInfection', []);
      tickCheckBoxesInDiv('div_Medicine_TIA', []);
      tickCheckBoxesInDiv('div_Medicine_UpperGIBleed', []);
      tickCheckBoxesInDiv('div_Medicine_Vasovagal', []);
      tickCheckBoxesInDiv('div_Medicine_OtherCardiacCondition', []);
      tickCheckBoxesInDiv('div_Medicine_OtherCNSCondiiton', []);
      tickCheckBoxesInDiv('div_Medicine_OtherHaematologicalCondition', []);
      tickCheckBoxesInDiv('div_Medicine_OtherRespiratoryCondition', []);
      tickCheckBoxesInDiv('div_MinorIllness_Abscess', []);
      tickCheckBoxesInDiv('div_MinorIllness_ALTE', []);
      tickCheckBoxesInDiv('div_MinorIllness_Choking', []);
      tickCheckBoxesInDiv('div_MinorIllness_Constipation', []);
      tickCheckBoxesInDiv('div_MinorIllness_Croup', []);
      tickCheckBoxesInDiv('div_MinorIllness_Epistaxis', []);
      tickCheckBoxesInDiv('div_MinorIllness_FebrileConvulsion', []);
      tickCheckBoxesInDiv('div_MinorIllness_Headache', []);
      tickCheckBoxesInDiv('div_MinorIllness_Impertigo', []);
      tickCheckBoxesInDiv('div_MinorIllness_NonspecificAbdoPain', []);
      tickCheckBoxesInDiv('div_MinorIllness_NonspecificChestPain', []);
      tickCheckBoxesInDiv('div_MinorIllness_OtherDermatologicalCondition', []);
      tickCheckBoxesInDiv('div_MinorIllness_OtisMediaorExterna', []);
      tickCheckBoxesInDiv('div_MinorIllness_SoftTissueInflamation', []);
      tickCheckBoxesInDiv('div_MinorIllness_URTIorTonsiilitis', []);
      tickCheckBoxesInDiv('div_MinorIllness_UTI', []);
      tickCheckBoxesInDiv('div_MinorIllness_ViralIllness', []);
      tickCheckBoxesInDiv('div_MinorIllness_ViralRash', []);
      tickCheckBoxesInDiv('div_MinorIllness_OtherENTCondition', []);
      tickCheckBoxesInDiv('div_ObsandGynae_AbdoPaininPregnancy', []);
      tickCheckBoxesInDiv('div_ObsandGynae_EctopicPregancy', []);
      tickCheckBoxesInDiv('div_ObsandGynae_HypermesisinPreganancy', []);
      tickCheckBoxesInDiv('div_ObsandGynae_OvarianCyst', []);
      tickCheckBoxesInDiv('div_ObsandGynae_PostOpProblem', []);
      tickCheckBoxesInDiv('div_ObsandGynae_PVBleedinginPregancy', []);
      tickCheckBoxesInDiv('div_ObsandGynae_SuspectedEptopicPregancy', []);
      tickCheckBoxesInDiv('div_ObsandGynae_OtherGynaecologicalCondition', []);
      tickCheckBoxesInDiv('div_ObsandGynae_OtherObstetricCondition', []);
      tickCheckBoxesInDiv('div_Ophthalmology_Conjunctivitis', []);
      tickCheckBoxesInDiv('div_Ophthalmology_CornealAbrasion', []);
      tickCheckBoxesInDiv('div_Ophthalmology_CornealForeignBody', []);
      tickCheckBoxesInDiv('div_Ophthalmology_RedEye', []);
      tickCheckBoxesInDiv('div_Ophthalmology_RetinalDetachment', []);
      tickCheckBoxesInDiv('div_Ophthalmology_OtherOphthalmologicalCondition', []);
      tickCheckBoxesInDiv('div_Orthopaedics_AtraumaticBackPain', []);
      tickCheckBoxesInDiv('div_Orthopaedics_Bursitis', []);
      tickCheckBoxesInDiv('div_Orthopaedics_CartliageInjuryKnee', []);
      tickCheckBoxesInDiv('div_Orthopaedics_CaudaEquina', []);
      tickCheckBoxesInDiv('div_Orthopaedics_Costochondritis', []);
      tickCheckBoxesInDiv('div_Orthopaedics_LigamentInjuryKnee', []);
      tickCheckBoxesInDiv('div_Orthopaedics_LockedKnee', []);
      tickCheckBoxesInDiv('div_Orthopaedics_Osteomyelitis', []);
      tickCheckBoxesInDiv('div_Orthopaedics_PostOpProblem', []);
      tickCheckBoxesInDiv('div_Orthopaedics_Sciatica', []);
      tickCheckBoxesInDiv('div_Orthopaedics_SepticArthritis', []);
      tickCheckBoxesInDiv('div_Orthopaedics_OtherOrthopaedicCondition', []);
      tickCheckBoxesInDiv('div_Psychiatry_AlcoholAbuse', []);
      tickCheckBoxesInDiv('div_Psychiatry_Anxiety', []);
      tickCheckBoxesInDiv('div_Psychiatry_Depression', []);
      tickCheckBoxesInDiv('div_Psychiatry_DrugAbuse', []);
      tickCheckBoxesInDiv('div_Psychiatry_Overdose', []);
      tickCheckBoxesInDiv('div_Psychiatry_Paranoia', []);
      tickCheckBoxesInDiv('div_Psychiatry_PoisoningControlledDrugs', []);
      tickCheckBoxesInDiv('div_Psychiatry_PoisoningOther', []);
      tickCheckBoxesInDiv('div_Psychiatry_PoisoningPrescriptiveDrugs', []);
      tickCheckBoxesInDiv('div_Psychiatry_PoisoningProprietryDrugs', []);
      tickCheckBoxesInDiv('div_Psychiatry_Suicidal', []);
      tickCheckBoxesInDiv('div_Psychiatry_OtherPsychiatricCondition', []);
      tickCheckBoxesInDiv('div_Surgery_AnalProblem', []);
      tickCheckBoxesInDiv('div_Surgery_Appendicitis', []);
      tickCheckBoxesInDiv('div_Surgery_BiliaryColicorCholescystitis', []);
      tickCheckBoxesInDiv('div_Surgery_BowelObstruction', []);
      tickCheckBoxesInDiv('div_Surgery_Diverticulitis', []);
      tickCheckBoxesInDiv('div_Surgery_Hernia', []);
      tickCheckBoxesInDiv('div_Surgery_IschaemicBowel', []);
      tickCheckBoxesInDiv('div_Surgery_IschaemicLimb', []);
      tickCheckBoxesInDiv('div_Surgery_LowerGIBleed', []);
      tickCheckBoxesInDiv('div_Surgery_Pancreatitis', []);
      tickCheckBoxesInDiv('div_Surgery_Perforation', []);
      tickCheckBoxesInDiv('div_Surgery_PostOpProblem', []);
      tickCheckBoxesInDiv('div_Surgery_SuspectedAppendicitis', []);
      tickCheckBoxesInDiv('div_Surgery_OtherSurgicalCondition', []);
      tickCheckBoxesInDiv('div_Urology_CatheterProblem', []);
      tickCheckBoxesInDiv('div_Urology_Epididymoorchitis', []);
      tickCheckBoxesInDiv('div_Urology_Paraphimosis', []);
      tickCheckBoxesInDiv('div_Urology_Pyelonephritis', []);
      tickCheckBoxesInDiv('div_Urology_RenalColic', []);
      tickCheckBoxesInDiv('div_Urology_TesticularTorsion', []);
      tickCheckBoxesInDiv('div_Urology_UrinaryRetention', []);
      tickCheckBoxesInDiv('div_Urology_UTI', []);
      tickCheckBoxesInDiv('div_Urology_OtherUroligicalCondition', []);
      tickCheckBoxesInDiv('div_OtherCategory_NAD', []);
      tickCheckBoxesInDiv('div_OtherCategory_Didnotwait', []);
      tickCheckBoxesInDiv('div_OtherCategory_Referredtospecialty', []);

      tickCheckBoxesInDiv('div_HeadandNeck_Brain', []);
      tickCheckBoxesInDiv('div_HeadandNeck_Ear', []);
      tickCheckBoxesInDiv('div_HeadandNeck_Eyes', []);
      tickCheckBoxesInDiv('div_HeadandNeck_Face', []);
      tickCheckBoxesInDiv('div_HeadandNeck_Head', []);
      tickCheckBoxesInDiv('div_HeadandNeck_MouthorJaw', []);
      tickCheckBoxesInDiv('div_HeadandNeck_Neck', []);
      tickCheckBoxesInDiv('div_HeadandNeck_Nose', []);
      tickCheckBoxesInDiv('div_HeadandNeck_Throat', []);
      tickCheckBoxesInDiv('div_LowerLimb_Ankle', []);
      tickCheckBoxesInDiv('div_LowerLimb_Foot', []);
      tickCheckBoxesInDiv('div_LowerLimb_Groin', []);
      tickCheckBoxesInDiv('div_LowerLimb_Hip', []);
      tickCheckBoxesInDiv('div_LowerLimb_Knee', []);
      tickCheckBoxesInDiv('div_LowerLimb_LowerLeg', []);
      tickCheckBoxesInDiv('div_LowerLimb_Thigh', []);
      tickCheckBoxesInDiv('div_LowerLimb_Toe', []);
      tickCheckBoxesInDiv('div_Trunk_Abdomen', []);
      tickCheckBoxesInDiv('div_Trunk_AnoRectal', []);
      tickCheckBoxesInDiv('div_Trunk_Breast', []);
      tickCheckBoxesInDiv('div_Trunk_Buttocks', []);
      tickCheckBoxesInDiv('div_Trunk_CSpine', []);
      tickCheckBoxesInDiv('div_Trunk_Chest', []);
      tickCheckBoxesInDiv('div_Trunk_Genitalia', []);
      tickCheckBoxesInDiv('div_Trunk_LSpine', []);
      tickCheckBoxesInDiv('div_Trunk_Pelvis', []);
      tickCheckBoxesInDiv('div_Trunk_TSpine', []);
      tickCheckBoxesInDiv('div_UpperLimb_Elbow', []);
      tickCheckBoxesInDiv('div_UpperLimb_Finger', []);
      tickCheckBoxesInDiv('div_UpperLimb_Forearm', []);
      tickCheckBoxesInDiv('div_UpperLimb_Hand', []);
      tickCheckBoxesInDiv('div_UpperLimb_Shoulder', []);
      tickCheckBoxesInDiv('div_UpperLimb_Thumb', []);
      tickCheckBoxesInDiv('div_UpperLimb_UpperArm', []);
      tickCheckBoxesInDiv('div_UpperLimb_Wrist', []);
      tickCheckBoxesInDiv('div_Laterallity_Left', []);
      tickCheckBoxesInDiv('div_Laterallity_Right', []);
      tickCheckBoxesInDiv('div_Laterallity_Bilateral', []);
      tickCheckBoxesInDiv('div_Laterallity_NotApplicable', []);

    }

    function clearDiagnosis() {
      DiagnosisArray = [];
      InjuriesArray = [];
      MedicineArray = [];
      MinorIlnessArray = [];
      ObsandGynaeArray = [];
      OphthalmologyArray = [];
      OrthopaedicsArray = [];
      OtherCategoryArray = [];
      PsychiatryArray = [];
      SurgeryArray = [];
      UrologyArray = [];
      AnatomicalAreaArray = [];
      InvestigationArray = [];
      AdditionalTreatmentsArray = [];
      AnaesthesiaArray = [];
      DischargeArray = [];
      LifeSupportArray = [];
      MedicationArray = [];
      MinorTreatmentsArray = [];
      MonitoringArray = [];
      ProceduresArray = [];
      WoundClosuresArray = [];

      InvestigationArray = [];

      TreatmentsArray = [];
      AdditionalTreatmentsArray = [];
      AnaesthesiaArray = [];
      DischargeArray = [];
      LifeSupportArray = [];
      MedicationArray = [];
      MinorTreatmentsArray = [];
      MonitoringArray = [];
      ProceduresArray = [];
      WoundClosuresArray = [];
      HeadandNeckArray = [];
      UpperLimbArray = [];
      TrunkArray = [];
      LowerLimbArray = [];
      LaterallityArray = [];
      InformationCategoryArray = [];
      SeniorReviewArray = [];
      DischargePlanningArray = [];
      DischargeNowArray = [];

    }



    function CheckSelection() {
      clearDiagnosis();

      $.each($("input[name='chk_Injuries']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_Medicine']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_MinorIlness']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_ObsandGynae']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_Ophthalmology']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_Orthopaedics']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_OtherCategory']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_Psychiatry']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_Surgery']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_Urology']:checked"), function () { DiagnosisArray.push($(this).val()); });
      $.each($("input[name='chk_AnatomicalArea']:checked"), function () { DiagnosisArray.push($(this).val()); });

      $.each($("input[name='chk_AdditionalTreatments']:checked"), function () { TreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_Anaesthesia']:checked"), function () { TreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_Discharge']:checked"), function () { TreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_LifeSupport']:checked"), function () { TreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_Medication']:checked"), function () { TreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_MinorTreatments']:checked"), function () { TreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_Monitoring']:checked"), function () { TreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_Procedures']:checked"), function () { TreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_WoundClosures']:checked"), function () { TreatmentsArray.push($(this).val()); });

      $.each($("input[name='chk_Injuries']:checked"), function () { InjuriesArray.push($(this).val()); });
      $.each($("input[name='chk_Medicine']:checked"), function () { MedicineArray.push($(this).val()); });
      $.each($("input[name='chk_MinorIlness']:checked"), function () { MinorIlnessArray.push($(this).val()); });
      $.each($("input[name='chk_ObsandGynae']:checked"), function () { ObsandGynaeArray.push($(this).val()); });
      $.each($("input[name='chk_Ophthalmology']:checked"), function () { OphthalmologyArray.push($(this).val()); });
      $.each($("input[name='chk_Orthopaedics']:checked"), function () { OrthopaedicsArray.push($(this).val()); });
      $.each($("input[name='chk_OtherCategory']:checked"), function () { OtherCategoryArray.push($(this).val()); });
      $.each($("input[name='chk_Psychiatry']:checked"), function () { PsychiatryArray.push($(this).val()); });
      $.each($("input[name='chk_Surgery']:checked"), function () { SurgeryArray.push($(this).val()); });
      $.each($("input[name='chk_Urology']:checked"), function () { UrologyArray.push($(this).val()); });
      $.each($("input[name='chk_AnatomicalArea']:checked"), function () { AnatomicalAreaArray.push($(this).val()); });
      $.each($("input[name='chk_Investigation']:checked"), function () { InvestigationArray.push($(this).val()); });
      $.each($("input[name='chk_AdditionalTreatments']:checked"), function () { AdditionalTreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_Anaesthesia']:checked"), function () { AnaesthesiaArray.push($(this).val()); });
      $.each($("input[name='chk_Discharge']:checked"), function () { DischargeArray.push($(this).val()); });
      $.each($("input[name='chk_LifeSupport']:checked"), function () { LifeSupportArray.push($(this).val()); });
      $.each($("input[name='chk_Medication']:checked"), function () { MedicationArray.push($(this).val()); });
      $.each($("input[name='chk_MinorTreatments']:checked"), function () { MinorTreatmentsArray.push($(this).val()); });
      $.each($("input[name='chk_Monitoring']:checked"), function () { MonitoringArray.push($(this).val()); });
      $.each($("input[name='chk_Procedures']:checked"), function () { ProceduresArray.push($(this).val()); });
      $.each($("input[name='chk_WoundClosures']:checked"), function () { WoundClosuresArray.push($(this).val()); });
      $.each($("input[name='chk_HeadandNeck']:checked"), function () { HeadandNeckArray.push($(this).val()); });
      $.each($("input[name='chk_UpperLimb']:checked"), function () { UpperLimbArray.push($(this).val()); });
      $.each($("input[name='chk_Trunk']:checked"), function () { TrunkArray.push($(this).val()); });
      $.each($("input[name='chk_LowerLimb']:checked"), function () { LowerLimbArray.push($(this).val()); });
      $.each($("input[name='chk_Laterallity']:checked"), function () { LaterallityArray.push($(this).val()); });
      $.each($("input[name='chk_InformationCategory']:checked"), function () { InformationCategoryArray.push($(this).val()); });

      $.each($("input[name='chk_SeniorReview']:checked"), function () { SeniorReviewArray.push($(this).val()); });
      $.each($("input[name='chk_DischargePlanning']:checked"), function () { DischargePlanningArray.push($(this).val()); });
      $.each($("input[name='chk_DischargeNow']:checked"), function () { DischargeNowArray.push($(this).val()); });

      MainDiagnosis = $("#ddlMainCategory").val();
      ReviewingDoctor = $("#ddlReviewingDoctor").val();
      Disposal = $("#ddlDisposal").val();
      DisposalWard = $("#ddDisposallWard").val();
      Comments = $("#txtDischargeComments").val();

      $("#lblDiagnosisArray").text(DiagnosisArray);
      if (DiagnosisArray.length == 0) {
        $("#lblDiagnosisStatus").html("<span class='text-danger'>Not Started</span>");
      }
      else {
        $("#lblDiagnosisStatus").html("<span class='text-success'>Completed</span>");
      }

      $("#lblInvestigationsArray").text(InvestigationArray);
      if (InvestigationArray.length == 0) {
        $("#lblInvestigationsStatus").html("<span class='text-danger'>Not Started</span>");
      }
      else {
        $("#lblInvestigationsStatus").html("<span class='text-success'>Completed</span>");
      }

      $("#lblTreatmentsArray").text(TreatmentsArray);
      if (TreatmentsArray.length == 0) {
        $("#lblTreatmentsStatus").html("<span class='text-danger'>Not Started</span>");
      }
      else {
        $("#lblTreatmentsStatus").html("<span class='text-success'>Completed</span>");
      }


      var seniorreviewarray =  SeniorReviewArray;
      if (seniorreviewarray.length > 0) {
        $("#lblSeniorReviewStatus").html("Senior Review Required");
      }
      else {
        $("#lblSeniorReviewStatus").html("");
      }

      var disposal = Disposal;
      if (disposal == "") {
        $("#lblDischargeStatus").html("<span class='text-danger'>Discharge Uncompleted</span>");
      }
      else {
        $("#lblDischargeStatus").html("<span class='text-success'>Discharge Completed</span>");
      }




    }

    function tickCheckBoxesInDiv(div, array) {
      $('#' + div + ' input:checkbox').each(function () { var state = $.inArray(this.value, array) != -1; $(this).prop('checked', state); });
    }

    function scrollToAnchor(aid) {
      var aTag = $("a[name='" + aid + "']");
      $('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
    }

    $(document).ready(function () {           

      $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          $('.scroll-top').fadeIn();
        } else {
          $('.scroll-top').fadeOut();
        }
      });

      $('.scroll-top').click(function () {
        $("html, body").animate({
          scrollTop: 0
        }, 100);
        return false;
      });

      $('#anchorDiagnosis').click(function () {
        scrollToAnchor("ad_Diagnosis");
      });

      $('#anchorInvestigations').click(function () {
        scrollToAnchor("ad_Investigations");
      });

      $('#anchorDischarge').click(function () {
        scrollToAnchor("ad_Discharge");
      });

      $('#anchorTreatments').click(function () {
        scrollToAnchor("ad_Treatments");
      });


      //
      $("#isLocked").hide();
      $("#btnUnlock").hide();
      $('#ddlMainCategory').attr('disabled', false);


      // hideAllDiagnosis();

      $('#ddlMainCategory').change(function () {

        // $("#isLocked").hide();
        // $("#btnUnlock").hide();
        // $('#ddlMainCategory').attr('disabled', false);

        if (diagnosis == "") {
          return;
        }

        // $("#isLocked").show();
        // $("#btnUnlock").show();
        // $('#ddlMainCategory').attr('disabled', true);

        var diagnosis = $('#ddlMainCategory').val();

        clearDiagnosis();
        hideAllDiagnosis();
        UntickInjuries();
        CheckSelection();


        if (diagnosis == "") {
          return;
        }
        showDiagnosis(diagnosis);
      });



      $('input[type=checkbox]').click(function () {
        CheckSelection();


      });

      $('#ddlDisposal').change(function () {
        CheckSelection();
      });



      $('#btnUnlock').click(function () {
        $("#isLocked").hide();
        $("#btnUnlock").hide();
        $('#ddlMainCategory').attr('disabled', false);
      });


      // $.each(loadStr, function() {
      //   console.log(this);
      //   $("#_Oxygen [value='" + this + "']").attr("checked", "checked");
      // });


      // $("input:checkbox").each(function () {
      //       var iid = $(this).attr("id");
      //       if (loadStr.indexOf(iid) != -1) this.checked = true
      //   });

      $('#btnSave').click(function () {
        //var i = 0; var arr = []; $('.chk_Monitoring:checked').each(function () { arr[i++] = $(this).val(); });
        //console.log(arr);

        //$("#isLocked").show();
        //$("#btnUnlock").show();
        //$('#ddlMainCategory').attr('disabled', true);
        CheckSelection();


        self.postCodingData.ane_coding_id = self.personId;
        self.postCodingData.person_id = self.personId;
        self.postCodingData.injuriesarray = JSON.stringify(InjuriesArray);
        self.postCodingData.medicinearray = JSON.stringify(MedicineArray);
        self.postCodingData.minorilnessarray = JSON.stringify(MinorIlnessArray);
        self.postCodingData.obsandgynaearray = JSON.stringify(ObsandGynaeArray);
        self.postCodingData.ophthalmologyarray = JSON.stringify(OphthalmologyArray);
        self.postCodingData.orthopaedicsarray = JSON.stringify(OrthopaedicsArray);
        self.postCodingData.othercategoryarray = JSON.stringify(OtherCategoryArray);
        self.postCodingData.psychiatryarray = JSON.stringify(PsychiatryArray);
        self.postCodingData.surgeryarray = JSON.stringify(SurgeryArray);
        self.postCodingData.urologyarray = JSON.stringify(UrologyArray);
        self.postCodingData.anatomicalareaarray = JSON.stringify(AnatomicalAreaArray);
        self.postCodingData.investigationarray = JSON.stringify(InvestigationArray);
        self.postCodingData.additionaltreatmentsarray = JSON.stringify(AdditionalTreatmentsArray);
        self.postCodingData.anaesthesiaarray = JSON.stringify(AnaesthesiaArray);
        self.postCodingData.dischargearray = JSON.stringify(DischargeArray);
        self.postCodingData.lifesupportarray = JSON.stringify(LifeSupportArray);
        self.postCodingData.medicationarray = JSON.stringify(MedicationArray);
        self.postCodingData.minortreatmentsarray = JSON.stringify(MinorTreatmentsArray);
        self.postCodingData.monitoringarray = JSON.stringify(MonitoringArray);
        self.postCodingData.proceduresarray = JSON.stringify(ProceduresArray);
        self.postCodingData.woundclosuresarray = JSON.stringify(WoundClosuresArray);
        self.postCodingData.headandneckarray = JSON.stringify(HeadandNeckArray);
        self.postCodingData.upperlimbarray = JSON.stringify(UpperLimbArray);
        self.postCodingData.trunkarray = JSON.stringify(TrunkArray);
        self.postCodingData.lowerlimbarray = JSON.stringify(LowerLimbArray);
        self.postCodingData.laterallityarray = JSON.stringify(LaterallityArray);
        self.postCodingData.informationcategoryarray = JSON.stringify(InformationCategoryArray);
        self.postCodingData.seniorreviewarray = JSON.stringify(SeniorReviewArray);
        self.postCodingData.dischargeplanningarray = JSON.stringify(DischargePlanningArray);
        self.postCodingData.dischargenowarray = JSON.stringify(DischargeNowArray);
        self.postCodingData.maindiagnosis = MainDiagnosis;
        self.postCodingData.reviewingdoctor = ReviewingDoctor;
        self.postCodingData.disposal = Disposal;
        self.postCodingData.disposalward = DisposalWard;
        self.postCodingData.comments = Comments;



        //console.log(JSON.stringify(self.postCodingData));
        self.subjects.showMessage.next({ result: "inprogress", message: "<h5>Please wait while the administration details are being added...<h5>" });

        self.subscriptions.add(self.apiRequest.postRequest(self.appService.baseURI + self.appService.postAnECodingURI, JSON.stringify(self.postCodingData))
          .subscribe(() => {
            self.subjects.showMessage.next({
              result: "complete", message: "<h5>Coding Details Saved Successfully</h5>", timeout: 5000
            })
          }));


        self.clearForm();
        self.gotoTop();



      });


    });
  }
}
