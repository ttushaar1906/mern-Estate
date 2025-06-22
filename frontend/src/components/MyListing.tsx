import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ownerPropertyFn } from "../controllers/Property/getProperty";
import { PropertyInt } from "../interfaces/PropertyInt";
import Error from "./Error";
import Loading from "./Loading";
import { AiOutlineEnvironment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import { SnackBarState } from "../interfaces/NotificationInt";
import Notification from "./Notification";
import axios from "axios";
import { deleteProperty } from "../apis/properiesAPI";

export default function MyListing() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<PropertyInt[]>({
    queryKey: ["properties"],
    queryFn: ownerPropertyFn,
  });

  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    severity: "info",
    message: "",
    autoHideDuration: 3000,
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      return await axios.delete(deleteProperty(id), { withCredentials: true });
    },
    onSuccess: (response) => {
      setSnackBar({
        open: true,
        message: response.data.message,
        severity: "success",
        autoHideDuration: 3000,
      });
      queryClient.invalidateQueries(["properties"]);
    },
    onError: () => {
      setSnackBar({
        open: true,
        severity: "error",
        message: "Failed to delete property",
        autoHideDuration: 3000,
      });
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="space-y-4 p-4">
      <h1 className="lgHeading">My Listings</h1>

      {data?.map((item) => (
        <div
          key={item._id}
          className="p-4 rounded shadow transition-transform duration-200 hover:shadow-lg hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4 justify-between">
            {/* Left: Property Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.images[0]?.url}
                alt={item.propertyName}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="text-lg font-semibold text-slate-700">
                  {item.propertyName}
                </p>
                <div className="flex items-center gap-1 text-sm text-slate-600 max-w-100">
                  <AiOutlineEnvironment />
                  <span>
                    {item.address.line1}, {item.address.line2}, {item.address.city}, {item.address.state}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex gap-2 pr-2">
              <Link to={`/property/${item._id}`}>
                <Tooltip title="View">
                  <IconButton>
                    <FaEye size={18} />
                  </IconButton>
                </Tooltip>
              </Link>

              <Link to={`/edit-property/${item._id}`}>
                <Tooltip title="Edit">
                  <IconButton>
                    <MdEdit size={20} />
                  </IconButton>
                </Tooltip>
              </Link>

              <Tooltip title="Delete">
                <IconButton
                  onClick={() => deleteMutation.mutate(item._id)}
                  disabled={deletingId === item._id}
                >
                  {deletingId === item._id ? <CircularProgress size={20}/> : <MdDelete size={20} />}
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      ))}

      {snackBar.open && (
        <Notification
          open={snackBar.open}
          severity={snackBar.severity}
          message={snackBar.message}
          onClose={() => setSnackBar({ ...snackBar, open: false })}
          autoHideDuration={snackBar.autoHideDuration}
        />
      )}
    </div>
  );
}
