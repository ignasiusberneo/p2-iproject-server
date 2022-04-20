const {
  Drama,
  Category,
  Comment,
  User,
  Watchlist,
} = require("../models/index");
const axios = require("axios");
const { application } = require("express");
const youtubeKey = process.env.YOUTUBE_KEY;

class dramaController {
  static async getDramas(req, res, next) {
    try {
      let { page } = req.query;
      if (!page) {
        page = 1;
      }
      const size = 9;
      const response = await Drama.findAndCountAll({
        order: [["totalWatchlist", "DESC"]],
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        limit: size,
        offset: (page - 1) * 9,
        where: {},
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json({
        data: response.rows,
        totalPage: Math.ceil(response.count / size),
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  static async getDramaById(req, res, next) {
    try {
      const { dramaId } = req.params;
      const response = await Drama.findOne({
        where: {
          id: dramaId,
        },
      });
      if (!response) {
        throw { name: "NOT_FOUND" };
      }
      let query = "";
      for (let i = 0; i < response.title.length; i++) {
        if (response.title[i] === " ") {
          query += "%20";
        } else {
          query += response.title[i];
        }
      }
      console.log(query);
      const youtubeUrl = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}%20trailer&key=${youtubeKey}`
      );
      const comments = await Comment.findAll({
        include: User,
        where: {
          DramaId: dramaId,
        },
      });
      console.log(youtubeUrl.data);
      res.status(200).json({
        data: response,
        comments,
        youtubeUrl: `https://www.youtube.com/watch?v=${youtubeUrl.data.items[0].id.videoId}`,
      });
    } catch (err) {
      if (err.name === "NOT_FOUND") {
        res.status(404).json({
          message: "Data Not Found",
        });
      } else {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
  static async addComment(req, res, next) {
    try {
      const { dramaId } = req.params;
      const { comment } = req.body;

      const response = await Comment.create({
        UserId: req.user.id,
        DramaId: dramaId,
        comment,
      });
      res.status(201).json({
        message: "Add comment success",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
  static async addWatchlist(req, res, next) {
    try {
      const { dramaId } = req.params;
      const authorization = await Watchlist.findOne({
        where: {
          UserId: req.user.id,
          DramaId: dramaId,
        },
      });
      if (authorization) {
        throw { name: "FORBIDDEN" };
      }
      await Watchlist.create({
        UserId: req.user.id,
        DramaId: dramaId,
      });
      await Drama.increment(
        {
          totalWatchlist: 1,
        },
        {
          where: {
            id: dramaId,
          },
        }
      );
      res.status(201).json({
        message: "Add to wishlist success",
      });
    } catch (err) {
      console.log(err);
      if (err.name === "FORBIDDEN") {
        res.status(403).json({
          message: "You've already add this drama to watchlist",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
}

module.exports = dramaController;
