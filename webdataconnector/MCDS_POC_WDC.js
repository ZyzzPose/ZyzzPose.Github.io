(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "partyId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "isActiveFlag",
            alias: "isActiveFlag",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "domicileCountryCode",
            alias: "domicileCountryCode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "lei",
            dataType: tableau.dataTypeEnum.string
          }, {
              id: "partyName",
              dataType: tableau.dataTypeEnum.string

        }, {
            id: "intrBnymLeFlag",
            dataType: tableau.dataTypeEnum.string

      }, {
          id: "countryOfRiskCode",
          dataType: tableau.dataTypeEnum.string

      }, {
          id: "entityTypeName",
          dataType: tableau.dataTypeEnum.string

      }, {
          id: "subEntityTypeName",
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
      $.getJSON("https://mcdsapi.qa.bnymellon.net/mcdsapi/party/catalog/entity?entityTypeCode=3", function(resp) {
          var feat = resp,
              tableData = [];

          // Iterate over the JSON object
          for (var i = 0, len = feat.length; i < len; i++) {
              tableData.push({
                  "partyId": feat[i].partyId,
                  "isActiveFlag": feat[i].isActiveFlag,
                  "domicileCountryCode": feat[i].domicileCountryCode,
                  "lei": feat[i].lei,
                  "partyName": feat[i].partyName,
                  "intrBnymLeFlag": feat[i].intrBnymLeFlag,
                  "countryOfRiskCode": feat[i].countryOfRiskCode,
                  "entityTypeName": feat[i].entityTypeName,
                  "subEntityTypeName": feat[i].subEntityTypeName
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
