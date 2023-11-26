"use client";
import { FcGoogle } from "react-icons/fc";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const NewUser = ({
  title,
  subtitle,
  isLoading,
  onGoogleSubmit,
  onSubmit,
  onChange,
  linkText,
  footerTitle,
  footerLinkTitle,
  buttonTitle,
  id1,
  label1,
}) => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page_content">
        <h2 className="page_header">{title}</h2>
        <div className="text-start px-6 py-4">
          <div className="text-xl text-center text-neutral-600 font-bold">
            {subtitle}
          </div>
        </div>
        <div className="flex flex-col gap-2 px-6">
          <div className="flex flex-col gap-4">
            {id1 === "name" || id1 === "username" ? (
              <Input
                id={id1}
                label={label1}
                disabled={isLoading}
                onChange={onChange}
                required
              />
            ) : null}
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              onChange={onChange}
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              disabled={isLoading}
              onChange={onChange}
              required
            />
            <hr />
            <Button
              label={buttonTitle}
              outline={false}
              onClick={onSubmit}
              isLoading={isLoading}
            />
            <Button
              outline
              label="Continue with Google"
              Icon={FcGoogle}
              onClick={onGoogleSubmit}
            />

            <div className="text-neutral-500 text-center mt-4 font-light">
              <div className="text-center flex flex-row items-center gap-2">
                <div>{footerTitle}</div>
                <div
                  className="text-blue-500 text-semibold cursor-pointer hover:underline"
                  onClick={() => navigate(`/${linkText}`)}
                >
                  {footerLinkTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
