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

  describe("GET /flairs/new", () => {
      it("should render a new flair form", (done) => {
          request.get(`${base}/${this.topic.id}/posts/${this.post.topicId}/new`, (err, res, body) => {
              expect(err).toBeNull();
              expect(body).toContain("New Flair");
              done();
          });
      });
  });

});