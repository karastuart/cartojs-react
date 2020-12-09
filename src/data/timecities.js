export default {
  name: 'Time to Cities',

  visible: true,

  style: `
    #layer {
      polygon-fill: ramp([val], (#ffc6c4, #ee919b, #cc607d, #9e3963, #672044), (30,60,90,180,240));
    }
    #layer::outline {
      line-width: 0;
      line-color: #ffffff;
      line-opacity: 0;
    }
  `,

  source: `
    SELECT * FROM gha_timecities_topo
  `,

  options: {
    featureClickColumns: ['cartodb_id', 'val']
  }
};
