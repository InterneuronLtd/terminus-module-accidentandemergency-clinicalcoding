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
export class PostCodingData {
  constructor(
       public ane_coding_id?: string,
       public person_id?: string,
			 public diagnosisarray?: string,
			 public investigationarray?: string,
			 public treatmentsarray?: string,
			 public injuriesarray?: string,
			 public medicinearray?: string,
			 public minorilnessarray?: string,
			 public obsandgynaearray?: string,
			 public ophthalmologyarray?: string,
			 public orthopaedicsarray?: string,
			 public othercategoryarray?: string,
			 public psychiatryarray?: string,
			 public surgeryarray?: string,
			 public urologyarray?: string,
			 public anatomicalareaarray?: string,
			 public additionaltreatmentsarray?: string,
			 public anaesthesiaarray?: string,
			 public dischargearray?: string,
			 public lifesupportarray?: string,
			 public medicationarray?: string,
			 public minortreatmentsarray?: string,
			 public monitoringarray?: string,
			 public proceduresarray?: string,
			 public woundclosuresarray?: string,
			 public headandneckarray?: string,
			 public upperlimbarray?: string,
			 public trunkarray?: string,
			 public lowerlimbarray?: string,
			 public laterallityarray?: string,
			 public informationcategoryarray?: string,
			 public seniorreviewarray?: string,
			 public dischargeplanningarray?: string,
			 public dischargenowarray?: string,
			 public maindiagnosis?: string,
			 public reviewingdoctor?: string,
			 public disposal?: string,
			 public disposalward?: string,
			 public comments?: string
  ) { }
}
