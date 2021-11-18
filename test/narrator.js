/* global jsyaml, engine */

let story;
let inventory;
let buttons;
let dic;
fetch("story.yaml")
  .then(res => res.text())
  .then(start);

function start(storyText) {
  story = jsyaml.load(storyText);
  dic = story.names;
  console.log("storyText111", story.start);
  const start = story.start;
  engine.setTitle(start.title);

  inventory = new Set(start.content);
  buttons = new Set(start.button);
  arrive(inventory, buttons);
}

function arrive(inventory, buttons) {
  engine.clearChoices(); // clear button
  engine.clearDescriptions(); // clear last des
  // add des content
  for(let item of inventory.values()) {
    console.log(item);
    engine.addDescription(dic[item.name], item.classlist);
  }
  // add button
  for(let item of buttons.values()) {
    engine.addChoice(
    item.name,
    () => {
      inventory = new Set(story[item.next][item.step].content);
      buttons = new Set(story[item.next][item.step].button);
      arrive(inventory, buttons);
    },
    item.classlist
  );
  }
}

function conditionsHold(obj) {
  // TODO: return false if obj.with contains any item not in inventory
  // TODO: return false if obj.with contains any time that *is* in inventory
  return true;
}
