"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    socket: {
        host: "localhost",
        port: 6379,
    },
    legacyMode: true, // 👈 important
});
redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
        console.log("Redis connected successfully");
        // Test legacy GET call
        const legacy = redisClient;
        legacy.get("test", (err, reply) => {
            if (err)
                console.error(err);
            else
                console.log("Value for 'test':", reply);
        });
    }
    catch (error) {
        console.error("Redis connection error", error);
    }
}))();
exports.default = redisClient;
