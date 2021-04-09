import React from 'react'
import { Link } from "react-router-dom";

const DatasetScreen = () => {
    return (
        <div>
            <table>
                <tr>
                    <th>Dataset</th>
                    <th>Authors</th>
                    <th>Description</th>
                    <th>Download Link</th>
                </tr>
                <tr>
                    <td>Abdominal and Direct Fetal ECG Database</td>
                    <td>Jezewski, Matonia</td>
                    <td>The configuration of the abdominal electrodes comprised four electrodes placed around the navel, a reference electrode placed above the pubic symphysis and a common mode reference electrode (with active-ground signal) placed on the left leg. To reduce the skin impedance, the areas under the Ag-AgCl electrodes were abraded. In all cases, the scalp electrode was placed for a clinical indication and all women consented to participate in this study.</td>
                    <td><Link to="/data1.zip" target="_blank" download>data1.zip</Link></td>
                </tr>
                <tr>
                    <td>AF Termination Challenge Database</td>
                    <td>George Moody</td>
                    <td>This database of two-channel ECG recordings has been created for use in the Computers in Cardiology Challenge 2004, an open competition with the goal of developing automated methods for predicting spontaneous termination of atrial fibrillation (AF). See the challenge announcement for information about the competition.</td>
                    <td><Link to="/data2.zip" target="_blank" download>data2.zip</Link></td>
                </tr>
                <tr>
                    <td>AHA Database Sample Excluded Record</td>
                    <td>Goldberger, Amaral</td>
                    <td>The American Heart Association (AHA), with funding from the National Heart, Lung, and Blood Institute (NHLBI), sponsored the development of the AHA Database for Evaluation of Ventricular Arrhythmia Detectors during the late 1970s and early 1980s at Washington University (St. Louis). The first portions of the AHA Database were released in 1982, and it was completed in 1985. No revisions or updates were made subsequently, although ECRI has distributed the database in several different formats.</td>
                    <td><Link to="/data3.zip" target="_blank" download>data3.zip</Link></td>
                </tr>
                <tr>
                    <td>ANSI/AAMI EC13 Test Waveforms</td>
                    <td>Goldberger, Amaral</td>
                    <td>The files in this set can be used for testing a variety of devices that monitor the electrocardiogram. The recordings include both synthetic and real waveforms. For details on these test waveforms and how to use them, please refer to section 5.1.2.1, paragraphs (e) and (g) in the reference below.</td>
                    <td><Link to="/data4.zip" target="_blank" download>data4.zip</Link></td>
                </tr>
                <tr>
                    <td>Blood Pressure in Salt-Sensitive Dahl Rats</td>
                    <td>Bugenhagen, Cowley</td>
                    <td>Salt-sensitive hypertension is known to be associated with dysfunction of the baroreflex control system in the Dahl salt-sensitive (SS) rat. However, neither the physiological mechanisms nor the genomic regions underlying the baroreflex dysfunction seen in this rat model are definitively known. Here, we have adopted a mathematical modeling approach to investigate the physiological and genetic origins of baroreflex dysfunction in the Dahl SS rat.</td>
                    <td><Link to="/data5.zip" target="_blank" download>data5.zip</Link></td>
                </tr>
            </table>
        </div>
    )
}

export default DatasetScreen