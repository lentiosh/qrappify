export default function LabelInput({ onLabelChange }) {
    const handleChange = (event) => {
      onLabelChange(event.target.value);
    };
  
    return (
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-semibold">Label</label>
        <input
          type="text"
          name="label"
          onChange={handleChange}
          placeholder="Enter a label for your QR code"
          className="w-full p-4 text-lg bg-white border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-[#4cd681]/20 focus:border-[#4cd681] outline-none transition-all duration-300 hover:border-[#4cd681]"
        />
      </div>
    );
  }