(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "accountId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "accountName",
            alias: "accountName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "accountTypeDescription",
            alias: "accountTypeDescription",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "statusCode",
            dataType: tableau.dataTypeEnum.string
          }, {
              id: "divisionName",
              dataType: tableau.dataTypeEnum.string

        }, {
            id: "aoPartyId",
            dataType: tableau.dataTypeEnum.string

      }, {
          id: "aoPartyName",
          dataType: tableau.dataTypeEnum.string

      }, {
          id: "amPartyId",
          dataType: tableau.dataTypeEnum.string

      }, {
          id: "amPartyName",
          dataType: tableau.dataTypeEnum.string
      }];

        var tableSchema = {
            id: "IPID_Data",
            alias: "Subset of IPID information",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Init function for connector, called during every phase but
  //only called when running inside the simulator or tableau



  myConnector.getData = function(table, doneCallback) {
        $.ajaxSetup({
    headers : {
      'x-jwt-assertion' : 'eyJ0eXAiOiJKV1QiLCJraWQiOiIxIiwieDV0IjoiZTN1Yzg5RmxYcjR2Zldkek4xZ0otUjlEVTk0IiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJ1cm46YnhwOmJ4cHNmIiwic3ViIjoiMSIsInN1Yl90eXBlIjoidXNlciIsImF1ZCI6InVybjpieHA6Ynhwc2YiLCJpYXQiOjE1NjYyMTA5NjQsImV4cCI6MTU2NjIxMjE2NCwibmJmIjoxNTY2MjEwOTY0fQ.bPwBbwP5LgI6vXRU6GtC025IgsKzavEvIWDNuevlQYKt-s__ijVz-0v-mWAhpb_flrPflOo8zpBNJHd3BLf9GmrcePDnIhaW1IFP0mVBMA62GRHmh977l1hHpA4oyzlSiWz9t6RTytasBC-Pun5htrNi1dZTYgCHdfPKi3SDkR4CdTS6degJ-thnVHljroN1nSZM02G4MkM_QN6j_A4JoDcF3gyw_gSvhXIiNufOpfg2nLPclLs2SzucAGqSHP4LBTTIcD-GJDk9_Ni9hGFBWgUoo06LnNn7eqK66dmfDteJq9Gn-9tlbJOCDneE2BnyckCneZytiSiEaf83X2nk1w'
    }
    });
      $.getJSON("https://mcdsapi.qa.bnymellon.net/mcdsapi/accounts/custody/all", function(resp) {
          var feat = resp,
              tableData = [];

          // Iterate over the JSON object
          for (var i = 0, len = feat.length; i < len; i++) {
              tableData.push({
                  "accountId": feat[i].accountId,
                  "accountName": feat[i].accountName,
                  "accountTypeDescription": feat[i].accountTypeDescription,
                  "statusCode": feat[i].statusCode,
                  "divisionName": feat[i].divisionName,
                  "aoPartyId": feat[i].aoPartyId,
                  "aoPartyName": feat[i].aoPartyName,
                  "amPartyId": feat[i].amPartyId,
                  "amPartyName": feat[i].amPartyName
              });
          }

          table.appendRows(tableData);
          doneCallback();
      });
  };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "MCDS POC Feed";
        tableau.submit();
    });
});
