const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Winter Games",
        description: "Post your Winter Games stories."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Snowball Fighting",
          body: "So much snow!",
          topicId: this.topic.id
          })
          .then((post) => {
          this.post = post;
          Flair.create({
              name: "Favorite",
              color: "Blue",
              postId: this.post.id
          })
            .then((flair) => {
            this.flair = flair;
            done();
            })
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("GET /topics/:topicId/posts/:postId/new", () => {
      it("should render a new flair form", (done) => {
          request.get(`${base}/${this.topic.id}/posts/${this.post.id}/new`, (err, res, body) => {
            console.log(body);
              expect(err).toBeNull();
              expect(body).toContain("New Flair");
              done();
          });
      });
  });

  describe("POST /topics/:topicId/posts/:postId/create", () => {
    it("should create a new flair and redirect", (done) => {
      const options = {
        url: `${base}/${this.topic.id}/posts/${this.post.id}/create`,
        form: {
          name: "News",
          color: "Green"
        }
      };
      request.post(options,
        (err, res, body) => {
          Flair.findOne({where: {name: "News"}})
          .then((post) => {
            console.log(flair);

            expect(post).not.toBeNull();
            expect(post.name).toBe("News");
            expect(post.body).toBe("Green");
            expect(post.postId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
    });

   
  describe("GET /topics/:topicId/posts/:postId", () => {
    it("should render a view with the selected flair", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}`, (err, res, body) => {
        expect(err).toBeNull;
        expect(body).toContain("Favorite");
        done();
      });
    });
  });

  describe("POST /topicsFlair/:topicId/posts/:postId/flair/:id/destroy", () => {

    it("should delete the flair with the associated ID", (done) => {
      expect(this.flair.id).toBe(1);

      request.post(`${base}/${this.topic.id}/posts/${this.post.id}/flair/${this.flair.id}/destroy`, (err, res, body) => {
        Flair.findById(1)
        .then((flair) => {
          expect(err).toBeNull();
          expect(flair).toBeNull();
          done();
        })
      });

    });

  });

  describe("GET /topics/:topicId/posts/:postId/flair/:id/edit", () => {

    it("should render a view with an edit flair form", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flair/${this.flair.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Flair Name");
        done();
      });
    });

  });

  describe("POST /topics/:topicId/posts/:id/flairs/update", () => {

    it("should return a status code 302", (done) => {
      request.post({
        url: `${base}/${this.topic.id}/posts/${this.post.id}/flair/${this.flair.id}/update`,
        form: {
          name: "News",
          body: "Green"
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    });

    it("should update the flair with the given values", (done) => {
        const options = {
          url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/update`,
          form: {
            name: "News"
          }
        };
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();

          Flair.findOne({
            where: {id: this.flair.id}
          })
          .then((post) => {
            expect(this.flair.name).toBe("Favorite");
            done();
          });
        });
    });

  });
});

});