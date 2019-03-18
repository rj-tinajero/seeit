const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const advertisement = require("../../src/db/models").advertisements;

describe("routes : advertisements", () => {
    beforeEach((done) => {
        this.advertisement;
        sequelize.sync({force: true}).then((res) => {
  
         advertisement.create({
           title: "JS Frameworks",
           description: "There is a lot of them"
         })
          .then((advertisement) => {
            this.advertisement = advertisement;
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
  
        });
  
      });

  describe("GET /advertisements", () => {
    it("should return a status code 200 and all advertisements", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("advertisements");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });

  });
  describe("GET /advertisements/new", () => {

    it("should render a new ad form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Ad");
        done();
      });
    });

  });

  describe("POST /advertisements/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "Zappos",
        description: "SALE 90% off all in store"
      }
    };

    it("should create a new ad and redirect", (done) => {

      request.post(options,

        (err, res, body) => {
          advertisement.findOne({where: {title: "Zappos"}})
          .then((advertisement) => {
            expect(res.statusCode).toBe(303);
            expect(advertisement.title).toBe("Zappos");
            expect(advertisement.description).toBe("SALE 90% off all in store");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });
  describe("GET /advertisements/:id", () => {

    it("should render a view with the selected ad", (done) => {
      request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("JS Frameworks");
        done();
      });
    });

  });
  describe("POST /advertisementss/:id/destroy", () => {

    it("should delete the ad with the associated ID", (done) => {

      advertisement.all()
      .then((advertisements) => {

        const adCountBeforeDelete = advertisements.length;

        expect(adCountBeforeDelete).toBe(1);

        request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
          advertisement.all()
          .then((advertisements) => {
            expect(err).toBeNull();
            expect(advertisements.length).toBe(adCountBeforeDelete - 1);
            done();
          })

        });
      });

    });

  });
  describe("GET /adverstisements/:id/edit" , () => {
      it("should render a view with an edit ad form", (done) => {
          request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
              expect(err).toBeNull();
              expect(body).toContain("Edit Ad");
              expect(body).toContain("JS Frameworks");
              done();
          });
      });
  });
  describe("POST /advertisements/:id/update", () => {

    it("should update the ad with the given values", (done) => {
       const options = {
          url: `${base}${this.advertisement.id}/update`,
          form: {
            title: "JavaScript Frameworks",
            description: "There are a lot of them"
          }
        };
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();
          advertisement.findOne({
            where: { id: this.advertisement.id }
          })
          .then((advertisement) => {
            expect(advertisement.title).toBe("JS Frameworks");
            done();
          });
        });
    });

  });
});