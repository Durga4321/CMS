import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "../../styles/roles.css";
import "react-toastify/dist/ReactToastify.css";

function CreateRole() {

  const [roleName, setRoleName] = useState("");
  const navigate = useNavigate();

  // Allowed system roles
  const allowedRoles = [
    "SUPER_ADMIN",
    "ADMIN",
    "DOCTOR",
    "RECEPTIONIST",
    "PATIENT"
  ];

  const handleSave = async () => {

    // Empty validation
    if (!roleName.trim()) {

      toast.error("Role name is required", {
        position: "top-center",
        autoClose: 2000
      });

      return;
    }

    // Convert uppercase
    const formattedRole =
      roleName.trim().toUpperCase();

    // Allowed validation
    if (!allowedRoles.includes(formattedRole)) {

      toast.error(
        `Allowed Roles: ${allowedRoles.join(", ")}`,
        {
          position: "top-center",
          autoClose: 3000
        }
      );

      return;
    }

    try {

      await api.roles.create({
        name: formattedRole
      });

      toast.success(
        "Role created successfully",
        {
          position: "top-center",
          autoClose: 1500
        }
      );

      setTimeout(() => {
        navigate("/roles");
      }, 1500);

    } catch (err) {

      console.error("Error creating role:", err);

      // Duplicate validation
      if (err.response?.status === 409) {

        toast.error("Role already exists", {
          position: "top-center",
          autoClose: 2000
        });

      } else {

        toast.error("Failed to create role", {
          position: "top-center",
          autoClose: 2000
        });
      }
    }
  };

  return (
    <div className="roles-container">

      <div className="roles-card">

        <h2 className="roles-title">
          Create Role
        </h2>

        <div className="roles-form">

          <label className="roles-label">
            Role Name
          </label>

          <input
            type="text"
            value={roleName}
            onChange={(e) =>
              setRoleName(e.target.value)
            }
            placeholder="Enter role name"
            className="roles-input"
          />

          
          <button
            className="roles-btn"
            onClick={handleSave}
          >
            Save Role
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateRole;