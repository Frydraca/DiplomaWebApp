import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { initializeScreen } from "../../api/Authentication";
import Catalog from "./DesignerCatalog/Catalog";
import Images from "./images";

function DesignerHelpScreen(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeScreen());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="DesignerHelpScreen">
      <div id="side">
        <Catalog></Catalog>
      </div>
      <div id="main">
        <Container>
          <div className="Lexicon">
            {(function () {
              switch (props.type) {
                case "home":
                  return (
                    <div>
                      <h4>The Basics</h4>
                      <p>
                        The AI Designer uses Blockly as it's base. Blockly is a
                        code generator tool, in which the user can use blocks to
                        build their code.
                      </p>
                      <p>
                        <a href="https://developers.google.com/blockly">
                          The Blockly website
                        </a>
                      </p>
                      <p>
                        The main screen of the designer page is the designer
                        area. Here you can see the blocks of your code. On the
                        left side are the categories. Click on them to open the
                        givens category's blocks. Drag and drop the desired
                        block into the main screen.
                      </p>
                      <p>
                        You can attach a block to another when the connection is
                        highlighted in yellow, they snap together.
                      </p>
                      <p>
                        The usual key combinations work, for example DELETE for
                        deleting a block, CTRL+C for copy and CTRL+V for paste.
                      </p>
                    </div>
                  );
                case "structures":
                  return (
                    <div>
                      <h4>The Structures</h4>
                      <p>
                        The Structure blocks are the basic blocks, which build
                        the statements of the code.
                      </p>
                      <h4>The Main Loop</h4>
                      <img
                        src={Images.MainLoop}
                        alt="Main Loop"
                        width="350"
                        height="141"
                      ></img>
                      <p>This block is the base of the code.</p>
                      <h4>Trigger-Action</h4>
                      <img
                        src={Images.Block}
                        alt="Block"
                        width="365"
                        height="211"
                      ></img>
                      <p>Use when an action is tied to a given condition.</p>
                      <h4>Only Action</h4>
                      <img
                        src={Images.OnlyAction}
                        alt="Only Action"
                        width="429"
                        height="144"
                      ></img>
                      <p>Use when an action should be always done.</p>
                      <h4>If-Else Action</h4>
                      <img
                        src={Images.IfElse}
                        alt="If Else"
                        width="319"
                        height="241"
                      ></img>
                      <p>
                        Use when depending on a condition, different actions
                        should be done.
                      </p>
                    </div>
                  );
                case "actions":
                  return (
                    <div>
                      <h4>The Actions</h4>
                      <p>
                        The Action blocks are the building and creating actions.
                      </p>
                      <h4>Build Up To</h4>
                      <img
                        src={Images.BuildUpTo}
                        alt="Main Loop"
                        width="411"
                        height="180"
                      ></img>
                      <p>
                        The premier method to specify the buildings of your
                        base. The game will build the buildings in order, until
                        all specified was built. If one gets destroyed it eill
                        be rebuilt.
                      </p>
                      <h4>Build</h4>
                      <img
                        src={Images.Build}
                        alt="Block"
                        width="249"
                        height="148"
                      ></img>
                      <p>Basic build command.</p>
                      <h4>Create</h4>
                      <img
                        src={Images.Create}
                        alt="Only Action"
                        width="233"
                        height="142"
                      ></img>
                      <p>Basic create command.</p>
                    </div>
                  );
                case "triggers":
                  return (
                    <div>
                      <h4>The Triggers</h4>
                      <p>
                        The Trigger blocks are acting as conditions for the
                        other blocks. Triggers can be concatenated after each
                        other to form AND relation.
                      </p>
                      <h4>OR Block</h4>
                      <img
                        src={Images.Or}
                        alt="Main Loop"
                        width="386"
                        height="211"
                      ></img>
                      <p>Use to form an OR relation between triggers.</p>
                      <h4>Have</h4>
                      <img
                        src={Images.Have}
                        alt="Block"
                        width="294"
                        height="145"
                      ></img>
                      <p>Condition whether you have or don't have something.</p>
                      <h4>Have Comparator</h4>
                      <img
                        src={Images.HaveCompare}
                        alt="Only Action"
                        width="336"
                        height="152"
                      ></img>
                      <p>
                        Condition whether you have less or more than something.
                      </p>
                      <h4>Enemy Have</h4>
                      <img
                        src={Images.EnemyHave}
                        alt="Only Action"
                        width="395"
                        height="132"
                      ></img>
                      <p>
                        Condition whether the enemy have the given units or not.
                      </p>
                      <h4>Enemy have Percentage</h4>
                      <img
                        src={Images.EnemyHavePercentage}
                        alt="Only Action"
                        width="421"
                        height="169"
                      ></img>
                      <p>
                        Condition whether the enemy have the given units at
                        least in the given percentage.
                      </p>
                      <h4>Enemy Attacked</h4>
                      <img
                        src={Images.EnemyAttacked}
                        alt="Only Action"
                        width="299"
                        height="118"
                      ></img>
                      <p>
                        Condition whether you have been attacked in the last
                        turn.
                      </p>
                    </div>
                  );
                case "types":
                  return (
                    <div>
                      <h4>The Types</h4>
                      <p>
                        The Type blocks are providing all the necessary types
                        for the block code.
                      </p>
                      <h4>Resources</h4>
                      <img
                        src={Images.Resources}
                        alt="Resources"
                        width="288"
                        height="81"
                      ></img>
                      <p>The resource types.</p>
                      <h4>Buildings</h4>
                      <img
                        src={Images.Buildings}
                        alt="Buildings"
                        width="287"
                        height="76"
                      ></img>
                      <p>The building types.</p>
                      <h4>Units</h4>
                      <img
                        src={Images.Units}
                        alt="Units"
                        width="248"
                        height="80"
                      ></img>
                      <p>The unit types.</p>
                      <h4>Upgrades</h4>
                      <img
                        src={Images.Upgrades}
                        alt="Upgrades"
                        width="260"
                        height="78"
                      ></img>
                      <p>The upgrade types</p>
                      <h4>Unit Upgrade</h4>
                      <img
                        src={Images.UnitUpgrades}
                        alt="UnitUpgrades"
                        width="364"
                        height="136"
                      ></img>
                      <p>Combined type, a unit and an upgrade together.</p>
                      <h4>Group</h4>
                      <img
                        src={Images.Group}
                        alt="Group"
                        width="334"
                        height="192"
                      ></img>
                      <p>Group for buildings or units. Can't be mixed.</p>
                      <h4>Group Element</h4>
                      <img
                        src={Images.GroupElement}
                        alt="GroupElement"
                        width="369"
                        height="147"
                      ></img>
                      <p>Helping block for the groups.</p>
                    </div>
                  );
                case "combatTactics":
                  return (
                    <div>
                      <h4>Combat Tactics</h4>
                      <p>
                        These blocks are used to defiene unit groups as combat
                        groups which ahve complex behaviour.
                      </p>
                      <h4>Combat Group</h4>
                      <img
                        src={Images.CombatGroup}
                        alt="CombatGroup"
                        width="451"
                        height="370"
                      ></img>
                      <p>The basic block of a combat group.</p>
                      <h4>Retreat Tactic</h4>
                      <img
                        src={Images.RetreatTactic}
                        alt="RetreatTactic"
                        width="330"
                        height="160"
                      ></img>
                      <p>Defines the rules of retreat for the group.</p>
                      <h4>Focus Fire Tactic</h4>
                      <img
                        src={Images.FocusFireTactic}
                        alt="FocusFireTactic"
                        width="338"
                        height="142"
                      ></img>
                      <p>Defines the focused target of the group.</p>
                    </div>
                  );
                case "unitTasks":
                  return (
                    <div>
                      <h4>The Unit Tasks</h4>
                      <p>
                        The Tasks blocks are used in the combat group block to
                        specify the groups task.
                      </p>
                      <h4>Attack task</h4>
                      <img
                        src={Images.AttackTask}
                        alt="AttackTask"
                        width="216"
                        height="81"
                      ></img>
                      <p>Attack task.</p>
                      <h4>Defend Task</h4>
                      <img
                        src={Images.DefendTask}
                        alt="DefendTask"
                        width="227"
                        height="82"
                      ></img>
                      <p>Defend task.</p>
                    </div>
                  );
                case "research":
                  return (
                    <div>
                      <h4>Research</h4>
                      <p>
                        Research blocks, which are needed to define research
                        tasks.
                      </p>
                      <h4>Research Block</h4>
                      <img
                        src={Images.Research}
                        alt="Research"
                        width="437"
                        height="175"
                      ></img>
                      <p>
                        The basic research block, it contains the concrete
                        upgrade rules.
                      </p>
                      <h4>Upgrade Block</h4>
                      <img
                        src={Images.UpgradeBlock}
                        alt="UpgradeBlock"
                        width="307"
                        height="129"
                      ></img>
                      <p>Defines a specific upgrade rule.</p>
                    </div>
                  );
                case "trading":
                  return (
                    <div>
                      <h4>Trading</h4>
                      <p>The Trading blocks define the trading rules.</p>
                      <h4>Trading Block</h4>
                      <img
                        src={Images.TradingBlock}
                        alt="AttackTask"
                        width="428"
                        height="195"
                      ></img>
                      <p>
                        The basic trading block, it contains the specific trade
                        rules.
                      </p>
                      <h4>Trading Rule</h4>
                      <img
                        src={Images.Trading}
                        alt="DefendTask"
                        width="326"
                        height="154"
                      ></img>
                      <p>Specific trading rule.</p>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default DesignerHelpScreen;
