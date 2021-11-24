import { Meteor } from "meteor/meteor";

export function Pencairan() {
  pencairan = new Meteor.Collection("pencairan");

  Router.route("/pencairan", { where: "server" })
    .get(function () {
      var response = pencairan.find().fetch();
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    .post(function () {
      var response;
      if (
        this.request.body.id_penjahit === undefined ||
        this.request.body.status === undefined ||
        this.request.body.jumlah_cair === undefined
      ) {
        response = {
          error: true,
          message: "invalid data",
        };
      } else {
        pencairan.insert({
          id_penjahit: this.request.body.id_penjahit,
          status: this.request.body.status,
          jumlah_cair: this.request.body.jumlah_cair,
        });
        response = {
          error: false,
          message: "pencairan added.",
        };
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });

  Router.route("/pencairan/:id", { where: "server" })

    // GET /message/:id - returns specific records

    .get(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = pencairan.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          response = data;
        } else {
          response = {
            error: true,
            message: "pencairan not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    // PUT /message/:id {message as put data}- update specific records.

    .put(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = pencairan.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (
            pencairan.update(
              { _id: data[0]._id },
              {
                $set: {
                  id_penjahit: this.request.body.id_penjahit,
                  status: this.request.body.status,
                  jumlah_cair: this.request.body.jumlah_cair,
                },
              }
            ) === 1
          ) {
            response = {
              error: false,
              message: "pencairan information updated.",
            };
          } else {
            response = {
              error: true,
              message: "pencairan information not updated.",
            };
          }
        } else {
          response = {
            error: true,
            message: "pencairan not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    })

    // DELETE /message/:id delete specific record.

    .delete(function () {
      var response;
      if (this.params.id !== undefined) {
        var data = pencairan.find({ _id: this.params.id }).fetch();
        if (data.length > 0) {
          if (pencairan.remove(data[0]._id) === 1) {
            response = {
              error: false,
              message: "pencairan deleted.",
            };
          } else {
            response = {
              error: true,
              message: "pencairan not deleted.",
            };
          }
        } else {
          response = {
            error: true,
            message: "pencairan not found.",
          };
        }
      }
      this.response.setHeader("Content-Type", "application/json");
      this.response.end(JSON.stringify(response));
    });
}
