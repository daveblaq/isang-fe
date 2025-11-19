"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Edit3, MapPin } from "lucide-react";

import Text from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  location: string;
  bio: string;
  avatarFile?: FileList;
};

const defaultValues: ProfileFormValues = {
  firstName: "Khan",
  lastName: "Isang",
  username: "@svckett",
  location: "Lagos, Nigeria",
  bio: "Technical difficulties on the therapist’s end prevented the session from taking place.",
  avatarFile: undefined,
};

const schema: yup.ObjectSchema<ProfileFormValues> = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  location: yup.string().required("Location is required"),
  bio: yup.string().required("Bio is required"),
  avatarFile: yup
    .mixed<FileList>()
    .test("fileSize", "Image must be smaller than 5MB", (files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= 5 * 1024 * 1024;
    })
    .optional(),
});

const defaultAvatar =
  "https://images.unsplash.com/illustrations/person.png?auto=format&fit=crop&w=200&q=80";
export default function ProfileTab() {
  const [photoPreview, setPhotoPreview] = useState<string>(defaultAvatar);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const form = useForm<ProfileFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (values: ProfileFormValues) => {
    const fileName = values.avatarFile?.[0]?.name ?? null;
    // eslint-disable-next-line no-console
    console.log("Profile settings", { ...values, avatarFile: fileName });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <Text
          variant="h5"
          className="text-lg md:text-xl font-semibold text-slate-900"
        >
          Profile
        </Text>
        <Text variant="span" className="text-xs md:text-sm text-slate-500">
          Update how you appear publicly across Isang.
        </Text>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 w-full lg:max-w-2xl"
        >
          <FormField
            control={form.control}
            name="avatarFile"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-3 p-3 md:gap-4 md:p-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <Avatar className="h-16 w-16 md:h-20 md:w-20 rounded-[8px] border-2 border-white">
                      <AvatarImage src={photoPreview} alt="profile avatar" />
                      <AvatarFallback className="rounded-[8px] bg-emerald-100 text-emerald-700">
                        KI
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Text
                        variant="span"
                        className="text-xs md:text-sm font-medium text-slate-900"
                      >
                        Profile photo
                      </Text>
                      <Text
                        variant="span"
                        className="block text-[10px] md:text-xs text-slate-500"
                      >
                        Recommended size 400x400px
                      </Text>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full md:w-auto flex items-center justify-center gap-2 rounded-[8px] border-slate-200 bg-white text-xs md:text-sm font-medium text-gray-800 font-ibm py-2 md:py-2.5"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Edit3 className="h-3 w-3 md:h-4 md:w-4" />
                    Edit photo
                  </Button>
                </div>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(node) => {
                      fileInputRef.current = node;
                      field.ref(node);
                    }}
                    onChange={(event) => {
                      const files = event.target.files;
                      field.onChange(files ?? undefined);
                      if (files && files[0]) {
                        const previewUrl = URL.createObjectURL(files[0]);
                        setPhotoPreview(previewUrl);
                      } else {
                        setPhotoPreview(defaultAvatar);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold text-slate-700">
                    First name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="First name"
                      className="text-sm md:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-semibold text-slate-700">
                    Last name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Last name"
                      className="text-sm md:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-semibold text-slate-700">
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="@username"
                    className="text-sm md:text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-xs md:text-sm font-semibold text-slate-700">
                  City, Country
                </FormLabel>
                <FormControl className="w-full">
                  <div className="relative flex w-full items-center">
                    <span className="absolute left-3 md:left-4 text-lg md:text-xl">
                      🇳🇬
                    </span>
                    <Input
                      {...field}
                      className="w-full pl-10 md:pl-12 pr-10 md:pr-12 text-sm md:text-base"
                      placeholder="City, Country"
                    />
                    <MapPin className="absolute right-3 md:right-4 h-3 w-3 md:h-4 md:w-4 text-slate-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm font-semibold text-slate-700">
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="rounded-[8px] shadow border border-slate-200 bg-white px-4 py-3 md:px-5 md:py-4 text-sm md:text-base text-slate-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full rounded-[8px] bg-[#FF5A1F] py-3 md:py-4 text-sm md:text-base font-medium font-ibm text-white"
            >
              Update profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
