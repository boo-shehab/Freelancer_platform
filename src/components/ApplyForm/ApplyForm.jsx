const ApplyForm = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (
      <ContainerForm isOpen={isOpen} onClose={onClose} HeadName="Edit About">
        <div className={styles.popup}>
          <input 
            type="number" 
            value=""
             />
          <textarea
            value={aboutInput}
            onChange={(e) => setAboutInput(e.target.value)}
            maxLength={2000}
            placeholder="Write about yourself..."
            className={styles.textarea}
          ></textarea>
          <span>{currentLength}/2000</span>
          <div className={styles.footer}>
            <button onClick={handleSave} className={styles.saveButton}>
              Save
            </button>
          </div>
        </div>
      </ContainerForm>
    );
}