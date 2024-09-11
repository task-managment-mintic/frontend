import PropTypes from 'prop-types'

const AvatarTable = ({ onClose }) => {
    return (
        <div>
            <div>
                div contenedor de las imágenes
                <div>Un div por cada imagen</div>
            </div>
            <button onClick={onClose}>
                Cambiar Avatar
            </button>
        </div>
    )
}

AvatarTable.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default AvatarTable