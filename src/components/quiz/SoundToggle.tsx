import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ isMuted, onToggle }: SoundToggleProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="nav-button"
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-muted-foreground" />
      ) : (
        <Volume2 className="w-4 h-4 text-foreground" />
      )}
    </motion.button>
  );
};

export default SoundToggle;
