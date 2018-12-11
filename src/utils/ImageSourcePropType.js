import * as PropTypes from 'prop-types'

/**
 * An incomplete type, however it's what we normally use throughout the app.
 */
const ImageSourcePropType = PropTypes.oneOfType([
    PropTypes.shape({
        uri: PropTypes.string.isRequired,
    }).isRequired,
    PropTypes.number.isRequired,
])

export default ImageSourcePropType