import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RTE, Input, Button, Select } from "../index";
import service from "../../appwrite/config";
import storageService from "../../appwrite/storageService";
import { useDispatch } from "react-redux";
import { setSelectedPost, setPosts } from "../../store/postSlice";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const [localImage, setLocalImage] = useState(null);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        await storageService.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        dispatch(setSelectedPost(dbPost));
        const updatedPosts = posts.map((p) =>
          p.$id === dbPost.$id ? dbPost : p
        );
        dispatch(setPosts(updatedPosts));
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        const dbPost = await service.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });
        if (dbPost) {
          dispatch(setPosts([...posts, dbPost]));
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }

      if (name === "image" && value.image && value.image[0]) {
        const file = value.image[0];
        const imageUrl = URL.createObjectURL(file);
        setLocalImage(imageUrl);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="slug"
          placeholder="slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {localImage || post?.featuredImage ? (
          <div className="w-full mb-4">
            <img
              src={
                localImage || storageService.getFilePreview(post.featuredImage)
              }
              alt="selected"
              className="rounded-lg object-cover"
              style={{ width: "100%", maxHeight: "200px" }}
            />
          </div>
        ) : null}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          children={post ? "update" : "Submit"}
        />
      </div>
    </form>
  );
}

export default PostForm;
