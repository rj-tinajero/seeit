const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
    
            Topic.create({
                title: "Expeditions to Alpha Centauri",
                description: "A compilation of reports from recent visits to the star system."
              })
              .then((topic) => {
                this.topic = topic;
                Post.create({
                  title: "My first visit to Proxima Centauri b",
                  body: "I saw some rocks.",
                  topicId: this.topic.id
                })
                .then((post) => {
                  this.post = post;
                  done();
                });
              })
              .catch((err) => {
                console.log(err);
                done();
              });
    
      });
    });
    
        describe("#create()", () => {
            it("should create a topic object and store it in the database when create function is called", (done) => {
                Topic.create({
                    title: "Guitars",
                    description: "A list of guitars used for stage performance"
                })
                .then((topic) => {
                    expect(topic.title).toBe("Guitars");
                    expect(topic.description).toBe("A list of guitars used for stage performance");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
        describe("#getPosts()", () => {
            it("should return associated post", (done) => {
                this.topic.getPosts({
                    include: [{
                        model: Post,
                        as: "posts"
                    }]
                })
                .then((associatedPost) => {
                    expect(associatedPost.title).toBe("My first visit to Proxima Centauri b");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

      
    
}); 
