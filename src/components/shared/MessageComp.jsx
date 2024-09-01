import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { bg, bg2 } from "../../components/shared/style";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";
import Proptype from "prop-types";
const MessageComponent = ({ message, User }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === User?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        ...parseCSS(sameSender ? bg : bg2),
        color: sameSender ? "black" : "white",
        width: "fit-content",
        padding: "0.5rem 1rem",
      }}
    >
      {!sameSender && (
        <Typography color={"#ff69b4"} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </motion.div>
  );
};

MessageComponent.propTypes = {
  message: Proptype.object,
  user: Proptype.object,
};

export default memo(MessageComponent);
const parseCSS = (cssString) => {
  const cssObject = {};
  cssString.split(";").forEach((rule) => {
    if (rule) {
      const [property, value] = rule.split(":");
      if (property && value) {
        cssObject[property.trim()] = value.trim();
      }
    }
  });
  return cssObject;
};
