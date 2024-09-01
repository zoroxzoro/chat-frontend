import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types"; // Import PropTypes

const Title = ({
  title = "chat",
  discripton = "this is a chat application",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={discripton} />
    </Helmet>
  );
};

Title.propTypes = {
  title: PropTypes.string, // Add PropTypes validation for the 'title' prop
  discripton: PropTypes.string, // Add PropTypes validation for the 'discripton' prop
};

export default Title;
