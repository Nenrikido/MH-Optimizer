import React from 'react';

function InfoCollapse() {
  return (
    <div>
      <a className="btn btn-secondary" data-bs-toggle="collapse" href="#collapse-info" role="button" aria-expanded="false" aria-controls="collapse-info">
        ⓘ Infos
      </a>
      <div className="collapse" id="collapse-info">
        <div className="card card-body">
          How to use :
          <ul>
            <li>Type your desired skills, sets and weapons in the input boxes (autocomplete available)</li>
            <li>Choose your max amount of skill points and the weight of each skill, and the min amount of pieces from each set</li>
            <li>In the "Filters" tab, you can choose the amulets you have in your box</li>
            <li>Click on "Optimize" and wait for the results</li>
          </ul>
          Notes :
          <ul>
            <li>Data is up to date with TU4 (AT Jin Dahaad)</li>
            <li>Yes the default values are for LS, yes i'm a weeb</li>
          </ul>
          Features to come :
          <ul>
            <li>Skill & set templates</li>
            <li>Armor pieces filters</li>
            <li>Better design (I suck at design sry)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InfoCollapse;

