import { useState, useRef } from "react";
import Image from "next/image";
import s from "./AvatarUpload.module.css";
import TrashIcon from "@/assets/icons/trash.svg";
import GalleryIcon from "@/assets/icons/gallery.svg";
import clsx from "clsx";

type AvatarUploadProps = {
  setAvatarFile: (file: File | null) => void;
  hasError?: boolean;
};

export default function AvatarUpload({
  setAvatarFile,
  hasError,
}: AvatarUploadProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference for input reset

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setAvatarFile(file);

      setAvatar(URL.createObjectURL(file)); // Create preview URL
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAvatar(null);

    setAvatarFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  return (
    <div
      className={clsx(s.avatarUpload, {
        [s.hasError]: hasError,
      })}
    >
      {avatar ? (
        <div className={s.previewWrapper}>
          <Image
            src={avatar}
            alt="Avatar Preview"
            width={88}
            height={88}
            className={s.preview}
          />
          <button
            type="button"
            onClick={handleRemove}
            className={s.deleteButton}
          >
            <TrashIcon />
          </button>
        </div>
      ) : (
        <label className={s.uploadLabel}>
          <div className={s.uploadPlaceholder}>
            <GalleryIcon />
            <span>ატვირთე ფოტო</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className={s.hiddenInput}
          />
        </label>
      )}
    </div>
  );
}
