import { records } from './events.js';

//Add events to records
//let records = [];
function addEvent(events, werewolf) {
  records.push({ events, werewolf });
}


//Extract a two-by-two table (an array) for each event to be used in calculating correlation.
function phiTable(event, record) {
  let table = [0, 0, 0, 0];
  for (let i in record) {
    let entry = record[i], index = 0;
    if (entry.events.includes(event)) {
      index += 1
    };

    if (entry.werewolf) {
      index += 2
    };
    table[index] += 1;
  }
  return table;
}

//Calculate the correlation between the variables extracted
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) / Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) * (table[1] + table[3]) * (table[0] + table[2]));
}

//Get every type of event 
function recordsEvents(record) {
  let events = [];
  for (let entry of record) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}
console.log(recordsEvents(records));

//Compute correlation for each event
let corList = [];
for (let event of recordsEvents(records)) {
 corList.push({ "activity": event, "correlation": phi(phiTable(event, records)) });
}
//console.log(corList);

//Get maximum correlation value
let maxVal = Math.max(...corList.map(x => x.correlation));

//Get activity causing the warewolf to turn (i.e activity with the highest correlation)
for (let item of corList) {
  if (item.correlation === maxVal) {
    console.log(`The event that makes the werewolf turn is: ${item.activity}`);
  }
}

