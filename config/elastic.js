// const uuid = require("uuid");
// const data = require("./publication.json");
// const fs = require('fs');
// const dataWithId = data.map((d) => ({ id: uuid.v4(), ...d }));

// fs.writeFileSync('publication_with_id.json',JSON.stringify(dataWithId, null , 2));


  // BULK LOAD
  const fs = require('fs');
  const elasticsearch = require('elasticsearch');
  const config = require('./index');
  const esClient = new elasticsearch.Client({
    host: config.ELASTIC_URL,
    log: 'error'
  });

module.exports.cleanIndex = () => new Promise((resolve, reject)=>{
  console.log(`Cleaning index: ${config.INDEX}`);
  esClient.indices.exists({
    index:config.INDEX,
  }).then(exists=>{
    if(!exists){
      resolve();
    }else{
      esClient.indices.delete({
        index:config.INDEX,
      }).then(del=>{
        resolve();
      }).catch(err=>{
        reject(err);
      })
    }
  }).catch(err=>{
    reject(err);
  })
})


module.exports.bulkIndexer = (data) =>new Promise((resolve, reject)=>{
    let bulkBody = [];
    console.log(`Indexing ${data.length} items..`);
    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: config.INDEX,
          _type: config.TYPE,
          _id: item._id
        }
      });

      bulkBody.push(item);
    });

    esClient.bulk({body: bulkBody})
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
      return resolve();
    })
    .catch(err=>{
      reject(err);
    });
  });
